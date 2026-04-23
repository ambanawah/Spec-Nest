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
            <Header activePage="laptops" />
            <main className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-72 flex-shrink-0">
                    {/* ... filter content ... */}
                </aside>

                {/* Main Product Grid */}
                <section className="flex-1 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">Precision Laptops</h1>
                            <p className="text-on-surface-variant text-sm font-body">
                                {loading ? 'Loading products...' : `Found ${products.length} flagship machines matching your profile`}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Placeholder for loading state */}
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="border rounded-lg p-4 shadow-lg bg-white animate-pulse">
                                    <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination - to be implemented */}
                </section>
            </main>
            <ComparisonTray />
            <Footer />
        </>
    );
};

export default CatalogPage;
