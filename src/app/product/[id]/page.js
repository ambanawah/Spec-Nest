import { Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { notFound } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getProductDetails(productId) {
    try {
        const res = await fetch(`${API_URL}/api/products/${productId}`,
        { next: { revalidate: 60 } } // Revalidate every 60 seconds
        );
        if (!res.ok) {
            if (res.status === 404) {
                return null; // Product not found
            }
            throw new Error('Failed to fetch product details');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

async function ProductDetails({ productId }) {
    const product = await getProductDetails(productId);

    if (!product) {
        notFound();
    }

    const specKeys = Object.keys(product.specs_json || {});

    return (
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
                        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-4">{product.name}</h1>
                        <p className="text-3xl font-light text-primary mb-6">${product.converted_price.toFixed(2)}</p>
                        <p className="text-on-surface-variant max-w-prose leading-relaxed mb-8">{product.description}</p>
                        
                        <div className="flex items-center gap-4 mb-8">
                             <button className="bg-primary text-on-primary font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                                Add to Cart
                            </button>
                             <button className="p-3 rounded-full hover:bg-surface-container-high transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant">favorite</span>
                            </button>
                        </div>

                        <div className="border-t border-outline-variant/10 pt-6">
                            <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Core Specifications</h3>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {specKeys.map(key => (
                                    <li key={key} className="flex justify-between border-b border-outline-variant/5 pb-2">
                                        <span className="text-sm text-on-surface-variant capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-sm font-medium text-on-surface">{product.specs_json[key]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ProductPage({ params }) {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="h-screen flex items-center justify-center"><p>Loading product...</p></div>}>
                <ProductDetails productId={params.id} />
            </Suspense>
            <Footer />
        </>
    );
}
