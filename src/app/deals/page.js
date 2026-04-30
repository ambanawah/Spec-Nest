'use client'
import { useState, useEffect } from 'react';
import ComparisonTray from '../components/ComparisonTray';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useCart } from '../cart/CartContext';

export default function DealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?category=Used');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header activePage="deals" />
      <main className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-label text-xs uppercase tracking-widest text-primary">Refine Specs</h2>
            <button className="text-[10px] uppercase font-label text-on-surface-variant hover:text-primary transition-colors">Reset All</button>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Price Range</label>
            <div className="h-1 bg-surface-container-highest rounded-full relative">
              <div className="absolute left-1/4 right-1/4 h-full bg-primary-container"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
            </div>
            <div className="flex justify-between font-label text-[10px] text-on-surface-variant">
              <span>$500</span>
              <span>$3000</span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Category</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-[12px] text-primary opacity-100" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">Laptops</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">Desktops</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                <span className="text-sm font-body text-on-surface group-hover:text-primary">Components</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

        <section className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">Hot Deals</h1>
              <p className="text-on-surface-variant text-sm font-body">Found {products.length} great deals on used and refurbished items</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Sort By:</span>
              <select className="bg-surface-container-low border-none text-primary font-label text-[10px] uppercase tracking-widest focus:ring-0 cursor-pointer">
                <option>Best Value</option>
                <option>Featured</option>
                <option>Price (Low-High)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-12">
            <button className="w-10 h-10 flex items-center justify-center bg-surface-container-high text-on-surface hover:bg-primary-container transition-colors rounded-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">2</button>
            <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-on-surface-variant">...</span>
            <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors rounded-sm">12</button>
          </div>
        </section>
      </main>
      <ComparisonTray />
      <Footer />
    </>
  );
}
