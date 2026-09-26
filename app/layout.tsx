import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'LinkUp — Find your people on campus',
  description:
    'LinkUp is a college-exclusive app that connects students through shared interests, goals, skills and personality. No student should feel alone in a crowd.'
};

export const viewport: Viewport = {
  themeColor: '#5B5BD6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
