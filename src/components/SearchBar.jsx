import React, { useState } from 'react';

const SearchBar = ({ onSearch, onBarcodeSearch }) => {
  const [query, setQuery] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleBarcodeSearch = (e) => {
    e.preventDefault();
    onBarcodeSearch(barcode);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <form onSubmit={handleSearch} className="flex-1 flex">
        <input
          type="text"
          placeholder="Search by product name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      <form onSubmit={handleBarcodeSearch} className="flex-1 flex">
        <input
          type="text"
          placeholder="Search by barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Scan
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
