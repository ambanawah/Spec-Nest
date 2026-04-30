import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { Suspense } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getLatestProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products?limit=3&sortBy=created_at&sortOrder=desc`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!res.ok) {
      throw new Error('Failed to fetch latest products');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return []; // Return empty array on error
  }
}

function ProductCard({ product }) {
    const specKeys = Object.keys(product.specs_json || {}).slice(0, 3);
    return (
        <Link href={`/product/${product.id}`} className="group bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 block">
            <div className="relative h-64 overflow-hidden bg-surface-container-high">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                    src={product.image_url || 'https://via.placeholder.com/400'}
                />
                {product.stock_quantity > 0 && (
                    <div className={`absolute top-4 left-4 px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider ${product.stock_quantity < 10 ? 'bg-tertiary-container text-white' : 'bg-primary-container text-white'}`}>
                        {product.stock_quantity < 10 ? `Only ${product.stock_quantity} left` : 'In Stock'}
                    </div>
                )}
            </div>
            <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="font-headline text-xl font-bold text-on-surface leading-tight">{product.name}</h4>
                    <span className="text-primary font-label font-bold">${product.converted_price.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                    {specKeys.map(key => (
                        <span key={key} className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                            {product.specs_json[key]}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                     <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-label text-xs text-on-surface">{product.average_rating ? parseFloat(product.average_rating).toFixed(1) : 'New'}</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">add_shopping_cart</span>
                </div>
            </div>
        </Link>
    );
}

async function LatestArrivals() {
    const products = await getLatestProducts();
    
    if (products.length === 0) {
        return (
             <div className="text-center col-span-full py-12">
                <p className="text-on-surface-variant">Could not load latest arrivals at this time.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* ... Hero Section ... */}
         <section className="relative h-[600px] md:h-[921px] overflow-hidden flex items-center px-4 sm:px-8 md:px-20 bg-surface-container-lowest">
          <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
          <img
            className="w-full h-full object-cover object-center opacity-60"
            alt="high-end gaming laptop with neon purple and blue backlighting on a sleek dark desk with abstract geometric shadows"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ01FrT5UMzxq9zGg5VlVfq6TgchOZbvZRQ6iUm6pnY8-dfhfTMz5SRKi2PNtb2cFySGvsCpLSCSdGyvFHsRf1_Fy00egNfQuGMQYX4NXfGfjhf7nijLkA29cjsY_zQy4ImRAv-cJwF1_3zaY9aPZOfH_rR0PPTNxfeZ0fnUvtSkqVURY3eU1FZGOxj83REj-FNWVqyIXfGEimeJD1gK2PzvvFONYqnG0rH_pndMXWrteX_FNn7mgWOh0pwxs-3lqauuxJXV2YX_mx"
          />
        </div>
        <div className="relative z-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary-container text-on-secondary-container mb-4 md:mb-6">
            <span className="font-label text-[10px] uppercase tracking-widest font-bold">New Release</span>
            <div className="w-1 h-1 rounded-full bg-on-secondary-container" />
            <span className="font-label text-[10px] uppercase tracking-widest font-bold">2024 Edition</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4 md:mb-6 leading-[0.9]">
            UNLEASH THE <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">ARCHITECT</span> WITHIN.
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl max-w-xl mb-8 md:mb-10 leading-relaxed">
            Precision-engineered hardware curated for those who build the future. Experience zero latency and peak thermal performance.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link href="/build" className="bg-gradient-to-br from-primary-container to-secondary-container text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md font-headline font-bold text-sm tracking-tight transition-transform duration-200 active:scale-95 shadow-lg shadow-primary-container/20 text-center">
              CONFIGURE YOUR RIG
            </Link>
            <Link href="/catalog" className="bg-transparent border border-outline-variant/30 text-on-surface px-6 py-3 sm:px-8 sm:py-4 rounded-md font-headline font-bold text-sm tracking-tight hover:bg-surface-container-high transition-colors active:scale-95 text-center">
              EXPLORE SPECS
            </Link>
          </div>
        </div>
      </section>
        {/* ... Categories Section ... */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-20 bg-surface-container-low">
            {/* ... category links ... */}
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-20 bg-surface">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16">
                <div className="mb-6 sm:mb-0">
                    <p className="font-label text-secondary text-xs tracking-[0.3em] uppercase mb-4">The Selection</p>
                    <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">LATEST ARRIVALS</h2>
                </div>
                <Link className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-xs tracking-widest uppercase" href="/catalog">
                    View All Collections <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
            </div>
            <Suspense fallback={<div className="text-center col-span-full py-12"><p className="text-on-surface-variant">Loading latest arrivals...</p></div>}>
                 <LatestArrivals />
            </Suspense>
        </section>

        {/* ... Features & Newsletter ... */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-20 bg-surface-container-lowest">
            {/* ... features grid ... */}
        </section>
        <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-20">
            {/* ... newsletter ... */}
        </section>
      </main>
      <Footer />
    </>
  );
}
