import Link from 'next/link';

const ProductCard = ({ product }) => {
    // Safely access nested properties
    const currency = product.currency_code || 'USD';
    const price = product.price || 'N/A';

    return (
        <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <Link href={`/product/${product.id}`}>
                <div>
                    <img src={product.image_url || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                    <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 mb-2">{product.category_name}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-blue-600">{`${price} ${currency}`}</p>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${product.stock_quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
