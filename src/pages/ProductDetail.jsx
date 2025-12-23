import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByBarcode } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(id);
        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  const {
    product_name,
    image_front_url,
    ingredients_text,
    nutriments,
    nutrition_grades,
    labels,
    categories,
    code,
  } = product;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Search</Link>
      
      <div className="bg-white shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 flex justify-center items-center bg-white border-r border-gray-100">
            <img
              src={image_front_url || 'https://via.placeholder.com/300'}
              alt={product_name}
              className="max-h-96 object-contain"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-800">{product_name}</h1>
                <p className="text-sm text-gray-500 mb-4">Barcode: {code}</p>
              </div>
              <button
                onClick={handleAddToCart}
                className={`px-6 py-2 rounded text-white font-bold transition-colors cursor-pointer ${
                  addedToCart ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
            
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 text-sm font-bold mr-2 ${
                nutrition_grades === 'a' ? 'bg-green-500 text-white' :
                nutrition_grades === 'b' ? 'bg-lime-500 text-white' :
                nutrition_grades === 'c' ? 'bg-yellow-500 text-white' :
                nutrition_grades === 'd' ? 'bg-orange-500 text-white' :
                nutrition_grades === 'e' ? 'bg-red-500 text-white' :
                'bg-gray-300 text-gray-700'
              }`}>
                Nutrition Grade: {nutrition_grades ? nutrition_grades.toUpperCase() : 'N/A'}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Categories</h2>
              <p className="text-gray-700">{categories || 'Unknown'}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <p className="text-gray-700">{ingredients_text || 'Ingredients not available'}</p>
            </div>

            {labels && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Labels</h2>
                <p className="text-gray-700">{labels}</p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Nutritional Values (per 100g)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Energy</p>
                  <p className="font-bold">{nutriments['energy-kcal_100g'] || 0} kcal</p>
                </div>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="font-bold">{nutriments.fat_100g || 0} g</p>
                </div>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-bold">{nutriments.carbohydrates_100g || 0} g</p>
                </div>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Proteins</p>
                  <p className="font-bold">{nutriments.proteins_100g || 0} g</p>
                </div>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Salt</p>
                  <p className="font-bold">{nutriments.salt_100g || 0} g</p>
                </div>
                <div className="bg-white border border-gray-200 p-3">
                  <p className="text-sm text-gray-500">Sugars</p>
                  <p className="font-bold">{nutriments.sugars_100g || 0} g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
