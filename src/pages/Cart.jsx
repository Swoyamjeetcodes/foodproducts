import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products yet.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-semibold text-gray-700">
          <div className="col-span-6">Product</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {cart.map((item) => (
          <div key={item.code} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center">
            <div className="col-span-1 md:col-span-6 flex items-center">
              <img 
                src={item.image_front_small_url || 'https://via.placeholder.com/50'} 
                alt={item.product_name} 
                className="w-16 h-16 object-contain mr-4 border border-gray-200 p-1 bg-white"
              />
              <div>
                <Link to={`/product/${item.code}`} className="font-semibold text-gray-800 hover:text-blue-600">
                  {item.product_name}
                </Link>
                <p className="text-sm text-gray-500">{item.brands}</p>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-3 flex justify-center items-center">
              <button 
                onClick={() => updateQuantity(item.code, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="mx-4 w-8 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.code, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            
            <div className="col-span-1 md:col-span-3 flex justify-end">
              <button 
                onClick={() => removeFromCart(item.code)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button 
          onClick={clearCart}
          className="text-red-600 hover:underline"
        >
          Clear Cart
        </button>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
