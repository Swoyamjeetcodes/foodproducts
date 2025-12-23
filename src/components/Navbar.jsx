import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartTotal } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Food Explorer
        </Link>
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-blue-600">
          <span className="mr-2">Cart</span>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {getCartTotal()}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
