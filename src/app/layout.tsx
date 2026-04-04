import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'FinTrack — Finance Dashboard',
  description:
    'A modern financial dashboard to track income, expenses, and spending patterns with insights and role-based access.',
  keywords: ['finance', 'dashboard', 'budget', 'expenses', 'income tracker'],
  authors: [{ name: 'FinTrack' }],
  openGraph: {
    title: 'FinTrack — Finance Dashboard',
    description: 'Smart personal finance tracking dashboard',
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
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
