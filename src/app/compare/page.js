'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useComparison } from './ComparisonContext';
import { useCart } from '../cart/CartContext';

// Placeholder for the comparison table component
const ComparisonTable = ({ products, onRemove, onAddToCart }) => (
    <div className="relative overflow-x-auto scrollbar-hide">
        <div className={`grid min-w-[1000px]`} style={{ gridTemplateColumns: `180px repeat(${products.length}, 1fr)`}}>
            {/* Label Column */}
            <div className="flex flex-col">
                <div className="h-96 flex items-end pb-8 border-b border-outline-variant/15">
                    <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60">Metric Matrix</span>
                </div>
                <div className="space-y-0 text-on-surface-variant font-label text-[10px] tracking-widest uppercase">
                    {Object.keys(products[0]?.details || {}).map((key, index) => (
                        <div key={key} className={`h-20 flex items-center px-4 ${index % 2 !== 0 ? 'bg-surface-container-low' : ''}`}>{key.replace(/_/g, ' ')}</div>
                    ))}
                     <div className="h-24 flex items-center"></div>
                </div>
            </div>

            {/* Product Columns */}
            {products.map((product, index) => (
                <div key={product.id} className={`flex flex-col group border-l border-outline-variant/10 ${index % 2 !== 0 ? 'bg-surface-container/30' : ''}`}>
                    <div className="h-96 p-6 relative flex flex-col justify-between border-b border-outline-variant/15">
                         <button onClick={() => onRemove(product.id)} className="self-end p-2 bg-surface-container-highest/50 hover:bg-error-container hover:text-on-error rounded-full transition-colors leading-none">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high to-surface-container-low">
                             <img
                                alt={product.name}
                                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                src={product.image_url}
                            />
                        </div>
                        <div>
                             <h3 className="font-headline text-xl font-bold text-on-surface">{product.name}</h3>
                             <p className="text-primary font-label text-sm mt-1">${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="space-y-0 text-on-surface font-body text-sm">
                         {Object.entries(product.details).map(([key, value], index) => (
                            <div key={key} className={`h-20 flex items-center px-6 ${index % 2 !== 0 ? 'bg-surface-container-low' : ''}`}>
                                {key.toLowerCase().includes('graphics') ? 
                                    <span className="bg-surface-container-highest px-3 py-1 rounded-sm font-label text-[10px] tracking-widest text-secondary">{value}</span> : 
                                    <span>{value}</span>
                                }
                            </div>
                        ))}
                        <div className="h-24 flex items-center px-6">
                            <button onClick={() => onAddToCart(product)} className="w-full py-3 bg-primary text-on-primary rounded-lg font-headline font-bold text-sm tracking-tight hover:brightness-110 transition-all scale-100 active:scale-95">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function ComparePage() {
    const { comparisonList, removeFromComparison } = useComparison();
    const { addToCart } = useCart();
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (comparisonList.length > 0) {
                setLoading(true);
                try {
                    const ids = comparisonList.map(p => p.id).join(',');
                    const response = await fetch(`/api/products/compare?ids=${ids}`);
                    const data = await response.json();
                    setProductDetails(data);
                } catch (error) {
                    console.error("Error fetching comparison data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProductDetails();
    }, [comparisonList]);

    const handleRemoveFromComparison = (productId) => {
        removeFromComparison(productId);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <>
            <Header />
            <main className="pt-32 pb-40 px-8 max-w-[1600px] mx-auto">
                <header className="mb-16">
                    <div className="flex items-baseline gap-4 mb-2">
                        <span className="font-label text-xs tracking-widest text-primary uppercase">Precision Engine</span>
                        <div className="h-px flex-grow bg-surface-container-high"></div>
                    </div>
                    <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">Hardware Benchmarking</h1>
                    <p className="text-on-surface-variant mt-4 max-w-2xl text-lg font-light leading-relaxed">
                        Analyze the structural integrity and performance metrics of the world's most capable mobile workstations side-by-side.
                    </p>
                </header>

                {loading && <p>Loading...</p>}
                {!loading && productDetails.length > 0 && 
                    <ComparisonTable 
                        products={productDetails} 
                        onRemove={handleRemoveFromComparison} 
                        onAddToCart={handleAddToCart}
                    />
                }
                {!loading && productDetails.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg text-on-surface-variant">Your comparison list is empty.</p>
                        <Link href="/catalog/laptops" className="mt-4 inline-block bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm tracking-tight">
                           Start Shopping
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
