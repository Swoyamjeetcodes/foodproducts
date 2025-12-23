import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';
import { fetchProducts, searchProducts, getProductsByCategory, getProductByBarcode } from '../services/api';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadProducts = async (reset = false) => {
    setLoading(true);
    try {
      let data;
      const currentPage = reset ? 1 : page;
      
      if (searchQuery) {
        data = await searchProducts(searchQuery, currentPage);
      } else if (category) {
        data = await getProductsByCategory(category, currentPage);
      } else {
        data = await fetchProducts(currentPage);
      }

      if (data.products) {
        let newProducts = data.products;
        
        // Client-side sorting
        if (sortOption) {
          newProducts = sortProducts(newProducts, sortOption);
        }

        if (reset) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
        
        if (newProducts.length === 0 || newProducts.length < 20) {
          setHasMore(false);
        } else {
            setHasMore(true);
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = (productsToSort, option) => {
    const sorted = [...productsToSort];
    switch (option) {
      case 'name_asc':
        return sorted.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
      case 'name_desc':
        return sorted.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
      case 'grade_asc':
        return sorted.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'));
      case 'grade_desc':
        return sorted.sort((a, b) => (b.nutrition_grades || 'z').localeCompare(a.nutrition_grades || 'z'));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    loadProducts(true);
    setPage(1);
  }, [searchQuery, category]);

  useEffect(() => {
    if (page > 1) {
      loadProducts(false);
    }
  }, [page]);

  useEffect(() => {
    if (sortOption && products.length > 0) {
      setProducts(sortProducts(products, sortOption));
    }
  }, [sortOption]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategory('');
  };

  const handleBarcodeSearch = async (barcode) => {
    try {
        setLoading(true);
        const data = await getProductByBarcode(barcode);
        if (data.status === 1) {
            navigate(`/product/${data.product.code}`);
        } else {
            alert('Product not found');
        }
    } catch (error) {
        console.error(error);
        alert('Error searching by barcode');
    } finally {
        setLoading(false);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Food Product Explorer</h1>
      
      <SearchBar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <CategoryFilter onSelectCategory={handleCategorySelect} />
        <SortOptions onSortChange={setSortOption} />
      </div>

      {loading && products.length === 0 ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {products.map((product, index) => (
              <ProductCard key={`${product.code}-${index}`} product={product} />
            ))}
          </div>
          
          {products.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-500">No products found.</div>
          )}

          {hasMore && products.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Homepage;
