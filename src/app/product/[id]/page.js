'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (e) {
                    setError(e.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { name, description, price, currency_code, stock_quantity, image_url, specs } = product;

    return (
        <>
            <Header />
            <main className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={image_url || 'https://via.placeholder.com/600'} alt={name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{name}</h1>
                        <p className="text-gray-600 mb-6">{description}</p>
                        <div className="mb-6">
                            <p className="text-3xl font-semibold text-blue-600">{`${price} ${currency_code}`}</p>
                            <p className={`text-lg font-medium ${stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stock_quantity > 0 ? 'In Stock' : 'Out of Stock'} ({stock_quantity} available)
                            </p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                            <ul className="space-y-2">
                                {specs && Object.entries(specs).map(([key, value]) => (
                                    <li key={key} className="flex justify-between">
                                        <span className="font-semibold text-gray-700">{key.replace(/_/g, ' ').toUpperCase()}</span>
                                        <span className="text-gray-900">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="mt-8">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetailsPage;
