import React from 'react';

const SortOptions = ({ onSortChange }) => {
  return (
    <div className="mb-4">
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full md:w-auto px-4 py2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Sort By</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
        <option value="grade_asc">Nutrition Grade (A-E)</option>
        <option value="grade_desc">Nutrition Grade (E-A)</option>
      </select>
    </div>
  );
};

export default SortOptions;
