# Font Installation Instructions

To complete the font update, you need to:

1. **Download the Freude font**
   - You'll need to acquire the Freude font file and save it as `Freude-Regular.woff2` in this directory.
   - This appears to be a premium font, so you may need to purchase it from a font foundry.

2. **The Gothic A1 font** 
   - This is being loaded from Google Fonts automatically, so no manual download is needed.

3. **After adding the font file**
   - Make sure the file is named exactly `Freude-Regular.woff2`
   - Restart your development server with `npm run dev` or `pnpm dev`

## Alternative approach if you don't have the Freude font

If you don't have access to the Freude font, you can:

1. Choose another similar display/title font from Google Fonts
2. Update the `fonts.ts` file to load that font instead

For example, to use "Bebas Neue" as an alternative:

```typescript
import { Gothic_A1, Bebas_Neue } from 'next/font/google';

// Alternative title font from Google Fonts
export const freude = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-freude',
  display: 'swap',
});

// Define Gothic A1 font from Google Fonts for body text
export const gothicA1 = Gothic_A1({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-gothic-a1',
  display: 'swap',
});
``` 