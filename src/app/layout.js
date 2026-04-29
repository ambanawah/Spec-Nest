import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./cart/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpecNest",
  description: "Curated hardware for the discerning builder.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
