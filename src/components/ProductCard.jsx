import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const {
    product_name,
    image_front_small_url,
    categories_tags,
    ingredients_text,
    nutrition_grades,
    code,
  } = product;

  const category = categories_tags ? categories_tags[0].replace('en:', '') : 'Unknown';
  const grade = nutrition_grades ? nutrition_grades.toUpperCase() : 'N/A';

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    addToCart(product);
    // Optional: Show a toast or feedback
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden flex flex-col h-full">
      <Link to={`/product/${code}`} className="flex-grow">
        <img
          src={image_front_small_url || 'https://via.placeholder.com/150'}
          alt={product_name}
          className="w-full h-48 object-contain p-4"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate" title={product_name}>
            {product_name || 'Unknown Product'}
          </h3>
          <p className="text-sm text-gray-600 mb-1">Category: {category}</p>
          <p className="text-sm text-gray-600 mb-2 truncate">
            Ingredients: {ingredients_text || 'Not available'}
          </p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 text-xs font-bold ${
              grade === 'A' ? 'bg-green-500 text-white' :
              grade === 'B' ? 'bg-lime-500 text-white' :
              grade === 'C' ? 'bg-yellow-500 text-white' :
              grade === 'D' ? 'bg-orange-500 text-white' :
              grade === 'E' ? 'bg-red-500 text-white' :
              'bg-gray-300 text-gray-700'
            }`}>
              Grade: {grade}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
