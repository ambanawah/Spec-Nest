'use client'
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ComparisonTray from '../components/ComparisonTray';
import Footer from '../components/Footer';
import Header from '../components/Header';

const CatalogPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Header />
            <main className="pt-24 pb-32 min-h-screen px-4 sm:px-6 md:px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Toggle Button (Mobile) */}
                    <div className="md:hidden flex justify-end mb-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-surface-container-high px-4 py-2 rounded-md flex items-center gap-2">
                            <span className="material-symbols-outlined">filter_list</span>
                            <span>Filters</span>
                        </button>
                    </div>

                    {/* Sidebar Filters */}
                    <aside className={`w-full md:w-72 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
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
                              <span>$4500</span>
                            </div>
                          </div>

                          {/* Brand Selection */}
                          <div className="space-y-3">
                            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Brand</label>
                            <div className="space-y-2">
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors">
                                  <span className="material-symbols-outlined text-[12px] text-primary opacity-100" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                                <span className="text-sm font-body text-on-surface group-hover:text-primary">ASUS ROG</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                                <span className="text-sm font-body text-on-surface group-hover:text-primary">Razer Blade</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded-sm border border-outline-variant bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors"></div>
                                <span className="text-sm font-body text-on-surface group-hover:text-primary">MSI Stealth</span>
                              </label>
                            </div>
                          </div>
                        </div>
                    </aside>

                    {/* Main Product Grid */}
                    <section className="flex-1 space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tighter text-on-surface">Precision Laptops</h1>
                                <p className="text-on-surface-variant text-sm font-body">
                                    {loading ? 'Loading products...' : `Found ${products.length} flagship machines`}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Sort By:</span>
                                <select className="bg-surface-container-low border-none text-primary font-label text-[10px] uppercase tracking-widest focus:ring-0 cursor-pointer">
                                    <option>Performance Score</option>
                                    <option>Featured</option>
                                    <option>Price (Low-High)</option>
                                </select>
                            </div>
                        </div>

                        {error && <p className="text-red-500">Error: {error}</p>}

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="border rounded-lg p-4 shadow-lg bg-white animate-pulse">
                                        <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <ComparisonTray />
            <Footer />
        </>
    );
};

export default CatalogPage;
