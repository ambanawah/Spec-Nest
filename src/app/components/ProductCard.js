import Link from 'next/link';

export default function ProductCard({ product }) {
    // Safely access specs, providing a default empty object
    const specs = product.specs_json || {};
    const specKeys = Object.keys(specs).slice(0, 3);

    // Safely access price, providing a default of 0
    const price = parseFloat(product.converted_price) || 0;

    return (
        <Link href={`/product/${product.id}`} className="group bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 block shadow-md hover:shadow-xl">
            <div className="relative h-64 overflow-hidden bg-surface-container-high">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name || 'Product image'}
                    src={product.image_url || 'https://via.placeholder.com/400'}
                />
                {product.stock_quantity > 0 ? (
                    <div className={`absolute top-4 left-4 px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider ${product.stock_quantity < 10 ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'}`}>
                        {product.stock_quantity < 10 ? `Only ${product.stock_quantity} left` : 'In Stock'}
                    </div>
                ) : (
                     <div className="absolute top-4 left-4 px-2 py-1 rounded-sm font-label text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
                        Out of Stock
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h4 className="font-headline text-xl font-bold text-on-surface leading-tight">{product.name || 'Unnamed Product'}</h4>
                    <span className="text-primary font-label font-bold">${price.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {specKeys.map(key => (
                        <span key={key} className="bg-surface-container-highest px-2 py-1 rounded-sm font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                            {specs[key]}
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
