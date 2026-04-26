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

    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-10">Loading...</div>;
        }

        if (error) {
            return <div className="text-center py-10 text-red-500">Error: {error}</div>;
        }

        if (!product) {
            return <div className="text-center py-10">Product not found</div>;
        }

        const { name, description, price, currency_code, stock_quantity, image_url, specs } = product;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <img src={image_url || 'https://via.placeholder.com/600'} alt={name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">{name}</h1>
                    <p className="text-gray-400 mb-6">{description}</p>
                    <div className="mb-6">
                        <p className="text-3xl sm:text-4xl font-semibold text-primary">{`${price} ${currency_code}`}</p>
                        <p className={`text-base sm:text-lg font-medium ${stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stock_quantity > 0 ? 'In Stock' : 'Out of Stock'} ({stock_quantity} available)
                        </p>
                    </div>
                    <div className="bg-surface-container-high p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                        <ul className="space-y-3">
                            {specs && Object.entries(specs).map(([key, value]) => (
                                <li key={key} className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-gray-300 capitalize">{key.replace(/_/g, ' ')}</span>
                                    <span className="text-gray-100 font-medium">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="mt-8">
                        <button className="w-full md:w-auto bg-primary-container text-white px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition-all">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-32 min-h-screen px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
                {renderContent()}
            </main>
            <Footer />
        </>
    );
};

export default ProductDetailsPage;
