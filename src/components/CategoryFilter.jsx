import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // OpenFoodFacts returns a lot of tags, we'll take the top 50 categories for now
        // The API structure for categories.json returns tags
        if (data.tags) {
            setCategories(data.tags.slice(0, 25));
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="mb-4">
      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
