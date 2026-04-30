
"use client";

import { useCart } from './CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
      <Header activePage="cart" />
      <main className="pt-32 pb-24 px-8 md:px-12 max-w-6xl mx-auto">
        <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface mb-8">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-on-surface-variant text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-surface-container-high p-4 rounded-lg">
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-on-surface-variant">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
