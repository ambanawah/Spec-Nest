import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './cart/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ComparisonProvider } from './compare/ComparisonContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpecNest',
  description: 'Curated hardware for the discerning builder.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CurrencyProvider>
            <ComparisonProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ComparisonProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
