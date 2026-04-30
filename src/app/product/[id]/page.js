'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../cart/CartContext';

export default function ProductPage() {
    const { id } = useParams();
    const { currency } = useCurrency();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        Promise.all([
            fetch(`/api/products/${id}?currency=${currency}`).then(r => r.json()),
            fetch(`/api/reviews/${id}`).then(r => r.json()),
        ])
            .then(([prod, revs]) => {
                setProduct(prod);
                setReviews(Array.isArray(revs) ? revs : []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [id, currency]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="h-screen flex items-center justify-center">
                    <p className="text-on-surface-variant">Loading product...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!product || product.error) {
        return (
            <>
                <Header />
                <div className="h-screen flex items-center justify-center">
                    <p className="text-on-surface-variant">Product not found.</p>
                </div>
                <Footer />
            </>
        );
    }

    const specKeys = Object.keys(product.specs_json || {});
    const avgRating = reviews.length
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    return (
        <>
            <Header />
            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="rounded-xl overflow-hidden bg-surface-container-high">
                            <img
                                src={product.image_url || 'https://via.placeholder.com/600'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-label text-sm text-secondary tracking-widest uppercase mb-2">{product.category_name}</p>
                            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">{product.name}</h1>
                            {product.seller_name && (
                                <p className="text-sm text-on-surface-variant mb-4">Sold by <span className="text-primary">{product.seller_name}</span></p>
                            )}
                            <p className="text-3xl font-light text-primary mb-2">
                                {product.display_currency} {parseFloat(product.converted_price).toFixed(2)}
                            </p>
                            {avgRating && (
                                <div className="flex items-center gap-1 mb-4">
                                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="font-label text-sm text-on-surface">{avgRating} ({reviews.length} reviews)</span>
                                </div>
                            )}
                            <p className="text-on-surface-variant max-w-prose leading-relaxed mb-8">{product.description}</p>

                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock_quantity === 0}
                                    className="bg-primary text-on-primary font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                                <button className="p-3 rounded-full hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined text-on-surface-variant">favorite</span>
                                </button>
                            </div>

                            {product.stock_quantity > 0 && product.stock_quantity < product.low_stock_threshold && (
                                <p className="text-sm text-tertiary mb-6">Only {product.stock_quantity} left in stock</p>
                            )}

                            <div className="border-t border-outline-variant/10 pt-6">
                                <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Core Specifications</h3>
                                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                                    {specKeys.map(key => (
                                        <li key={key} className="flex justify-between border-b border-outline-variant/5 pb-2">
                                            <span className="text-sm text-on-surface-variant capitalize">{key.replace(/_/g, ' ')}</span>
                                            <span className="text-sm font-medium text-on-surface">{String(product.specs_json[key])}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    {reviews.length > 0 && (
                        <div className="mt-16 border-t border-outline-variant/10 pt-12">
                            <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">Customer Reviews</h2>
                            <div className="space-y-6">
                                {reviews.map(r => (
                                    <div key={r.id} className="bg-surface-container-low rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-bold text-on-surface">{r.username}</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="material-symbols-outlined text-secondary text-sm"
                                                        style={{ fontVariationSettings: `'FILL' ${i < r.rating ? 1 : 0}` }}>star</span>
                                                ))}
                                            </div>
                                        </div>
                                        {r.title && <p className="font-semibold text-on-surface mb-1">{r.title}</p>}
                                        <p className="text-on-surface-variant text-sm">{r.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
