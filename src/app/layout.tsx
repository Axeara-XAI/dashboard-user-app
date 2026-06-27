import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import '../app/globals.css';

// ============================================================================
// RESOURCE INITIALIZATION
// ============================================================================
// Menginisialisasi font Inter sebagai standar tipografi modern
const inter = Inter({ subsets: ['latin'] });

// ============================================================================
// METADATA CONFIGURATION
// ============================================================================
export const metadata: Metadata = {
  title: 'Axara Panel',
  description: 'Dashboard manajemen ekosistem DataSpace terpusat dengan dukungan AI.',
  icons: {
    icon: '/logo.svg', // Mendaftarkan logo SVG sebagai favicon
  },
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Menyematkan class font Inter secara global di tag HTML
    <html lang="en" className={inter.className}>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
