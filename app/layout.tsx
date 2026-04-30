import type { Metadata } from 'next';
import './globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';

export const metadata: Metadata = {
  title: 'Chunaav — Learn Democracy, One Vote at a Time',
  description:
    'An immersive, gamified platform to understand elections, electoral history, political jargon, and the full process of running for office.',
  keywords: ['elections', 'democracy', 'civic education', 'India', 'vote', 'parliament'],
  authors: [{ name: 'Chunaav' }],
  openGraph: {
    title: 'Chunaav — Learn Democracy, One Vote at a Time',
    description: 'An immersive, gamified platform to understand elections and democracy.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
