"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';

export default function AddressesPage() {
    const { user, token } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError('Please log in to view your addresses.');
            return;
        }

        const fetchAddresses = async () => {
            try {
                const res = await fetch(`/api/addresses`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch addresses.');
                }
                const data = await res.json();
                setAddresses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [token]);

    return (
        <>
            <Header />
            <main className="pt-32 pb-24 px-8 md:px-12 max-w-4xl mx-auto">
                <h1 className="text-4xl font-headline font-bold text-center mb-12">Your Addresses</h1>
                {loading && <p className="text-center">Loading addresses...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                 {!loading && !error && addresses.length === 0 && (
                    <div className="text-center">
                         <p className="text-on-surface-variant mb-4">You haven't saved any addresses yet.</p>
                         {/* Add a button to add a new address here */}
                    </div>
                )}
                <div className="space-y-6">
                    {addresses.map(address => (
                        <div key={address.address_id} className="bg-surface-container-low p-6 rounded-lg shadow-md flex justify-between items-start">
                            <div>
                                <p className="font-bold text-on-surface">{address.address_line_1}</p>
                                {address.address_line_2 && <p className="text-on-surface-variant">{address.address_line_2}</p>}
                                <p className="text-on-surface-variant">{address.city}, {address.state} {address.postal_code}</p>
                                <p className="text-on-surface-variant">{address.country}</p>
                            </div>
                           {/* Add edit/delete buttons here */}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
