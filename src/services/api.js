const BASE_URL = 'https://world.openfoodfacts.org';

export const fetchProducts = async (page = 1, pageSize = 12) => {
  try {
    const response = await fetch(`${BASE_URL}/cgi/search.pl?search_simple=1&action=process&json=1&page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const searchProducts = async (query, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error('Failed to search products');
    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.json`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category, page = 1, pageSize = 12) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}.json?page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};
