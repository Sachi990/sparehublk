// src/components/CategoryTree.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const CategoryTree = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Expected response format:
        // { categories: [ { value: 'bearing', label: 'Bearing', subcategories: [ { value: 'ball-bearing', label: 'Ball Bearing' }, ... ] }, ... ] }
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const toggleExpand = (catValue) => {
    setExpanded(prev => ({
      ...prev,
      [catValue]: !prev[catValue]
    }));
  };

  const handleSelect = (category, subcategory = null) => {
    // Callback with selected category and optionally subcategory.
    if (onSelectCategory) {
      onSelectCategory({ category, subcategory });
    }
  };

  const renderCategoryItem = (cat) => (
    <li key={cat.value} className="mb-2">
      <div className="flex items-center cursor-pointer hover:text-accent">
        {cat.subcategories && cat.subcategories.length > 0 && (
          <span
            className="mr-2"
            onClick={() => toggleExpand(cat.value)}
          >
            {expanded[cat.value] ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
        <span onClick={() => handleSelect(cat.value)}>{cat.label}</span>
      </div>
      {expanded[cat.value] && cat.subcategories && cat.subcategories.length > 0 && (
        <ul className="ml-6 mt-1">
          {cat.subcategories.map(sub => (
            <li
              key={sub.value}
              className="cursor-pointer hover:text-accent"
              onClick={() => handleSelect(cat.value, sub.value)}
            >
              {sub.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-4 border-r sticky top-0">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories available</p>
      ) : (
        <ul>
          {categories.map(renderCategoryItem)}
        </ul>
      )}
    </div>
  );
};

export default CategoryTree;
