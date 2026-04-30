"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext'; // Assuming you create an AuthContext

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function OrdersPage() {
    const { user, token } = useAuth(); // You would get user and token from your AuthContext
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError('Please log in to view your orders.');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/api/orders`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch orders.');
                }
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <>
            <Header />
            <main className="pt-32 pb-24 px-8 md:px-12 max-w-4xl mx-auto">
                <h1 className="text-4xl font-headline font-bold text-center mb-12">Your Orders</h1>
                {loading && <p className="text-center">Loading orders...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && orders.length === 0 && (
                    <p className="text-center text-on-surface-variant">You haven't placed any orders yet.</p>
                )}
                <div className="space-y-8">
                    {orders.map(order => (
                        <div key={order.order_id} className="bg-surface-container-low p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-bold text-lg text-on-surface">Order #{order.order_id}</p>
                                    <p className="text-sm text-on-surface-variant">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">${parseFloat(order.total_price).toFixed(2)} {order.currency}</p>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${order.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-on-surface-variant">Shipping to: {order.full_address}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
