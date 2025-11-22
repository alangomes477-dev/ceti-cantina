import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Cantina CETI',
  description: 'Aplicativo de gestão de alimentação escolar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* 👇 ESTA É A SOLUÇÃO DE EMERGÊNCIA 👇 */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body className={`${poppins.className} antialiased bg-gray-50 text-gray-800`}>
        {children}
      </body>
    </html>
  );
}