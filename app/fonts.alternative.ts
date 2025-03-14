import { Bebas_Neue, Gothic_A1 } from 'next/font/google';

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