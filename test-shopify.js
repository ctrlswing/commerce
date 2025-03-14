const fs = require('fs');
const https = require('https');

// Read environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)="?([^"]*)"?$/);
  if (match) {
    acc[match[1]] = match[2];
  }
  return acc;
}, {});

const SHOPIFY_STORE_DOMAIN = envVars.SHOPIFY_STORE_DOMAIN.replace(/\/$/, '');
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = envVars.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

console.log(`Using Shopify domain: ${SHOPIFY_STORE_DOMAIN}`);
console.log(`Using access token: ${SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 4)}...${SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(SHOPIFY_STOREFRONT_ACCESS_TOKEN.length - 4)}`);

const query = `
  query {
    collections(first: 100) {
      edges {
        node {
          id
          handle
          title
          products(first: 5) {
            edges {
              node {
                id
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;

const postData = JSON.stringify({ query });

const graphqlEndpoint = new URL('/api/2023-10/graphql.json', SHOPIFY_STORE_DOMAIN);
const hostname = graphqlEndpoint.hostname;
const path = graphqlEndpoint.pathname;

const options = {
  hostname,
  path,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`Sending request to: ${hostname}${path}`);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('\nShopify API Response Status:', res.statusCode);
      
      if (jsonData.errors) {
        console.log('Errors:', JSON.stringify(jsonData.errors, null, 2));
      } else if (jsonData.data && jsonData.data.collections) {
        console.log('\nAvailable collections:');
        jsonData.data.collections.edges.forEach(({ node }) => {
          const productCount = node.products.edges.length;
          console.log(`- ${node.title} (handle: ${node.handle}), Products: ${productCount}`);
          if (productCount > 0) {
            console.log('  Products:');
            node.products.edges.forEach(({ node: product }) => {
              console.log(`  - ${product.title} (handle: ${product.handle})`);
            });
          }
        });
        
        // Check specifically for the collections used in the app
        const specialCollections = [
          'hidden-homepage-featured-items', 
          'hidden-homepage-carousel'
        ];
        
        console.log('\nChecking for special collections used in the app:');
        specialCollections.forEach(handle => {
          const found = jsonData.data.collections.edges.find(
            ({ node }) => node.handle === handle
          );
          
          if (found) {
            const productCount = found.node.products.edges.length;
            console.log(`✅ Collection "${handle}" exists with ${productCount} products`);
          } else {
            console.log(`❌ Collection "${handle}" NOT FOUND - this is needed for the homepage`);
          }
        });
      }
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end(); 