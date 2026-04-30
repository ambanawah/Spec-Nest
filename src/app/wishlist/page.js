"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';
import ProductCard from '../components/ProductCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function WishlistPage() {
    const { user, token } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError('Please log in to view your wishlist.');
            return;
        }

        const fetchWishlist = async () => {
            try {
                const res = await fetch(`${API_URL}/api/wishlist`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch wishlist.');
                }
                const data = await res.json();
                setWishlistItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [token]);

    return (
        <>
            <Header />
            <main className="pt-32 pb-24 px-8 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl font-headline font-bold text-center mb-12">Your Wishlist</h1>
                {loading && <p className="text-center">Loading wishlist...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && wishlistItems.length === 0 && (
                    <p className="text-center text-on-surface-variant">Your wishlist is empty.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistItems.map(item => (
                        <ProductCard key={item.product_id} product={item.product} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
