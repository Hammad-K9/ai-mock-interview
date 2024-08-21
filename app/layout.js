import './globals.css';
import { Outfit } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/sonner';

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
