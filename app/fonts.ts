import { Gothic_A1 } from 'next/font/google';
import localFont from 'next/font/local';

// Define local Freude font for titles
export const freude = localFont({
  src: [
    {
      path: '../fonts/Freude-Regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
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