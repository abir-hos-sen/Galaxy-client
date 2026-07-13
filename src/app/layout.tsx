import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Galaxy & Space Explorer | Unveil the Cosmos',
  description: 'Explore the infinite wonders of space. Track planets, stars, galaxies, nebulae, astronauts, and historic space missions on a premium interactive canvas.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${orbitron.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex flex-col min-h-full bg-[#0B0E23] text-[#E5E7EB] font-sans selection:bg-[#6C5CE7]/30 selection:text-white">
        <AuthProvider>
          <StarfieldBackground />
          <Navbar />
          
          <main className="flex-grow pt-24 pb-12 relative z-10">
            {children}
          </main>
          
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#111430',
                color: '#E5E7EB',
                border: '1px solid rgba(108, 92, 231, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#FFC947',
                  secondary: '#111430',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
