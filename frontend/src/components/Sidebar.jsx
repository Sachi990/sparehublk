// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

function Sidebar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/categories');
        // Adjust mapping if your API returns a plain array:
        const formatted =
          res.data.categories && Array.isArray(res.data.categories)
            ? res.data.categories
            : res.data.map(cat => ({
                value: cat.toLowerCase().replace(/\s+/g, '-'),
                label: cat,
                subcategories: [] // Extend if your backend supports subcategories
              }));
        setCategories(formatted);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const toggleExpand = (catValue) => {
    setExpanded((prev) => ({ ...prev, [catValue]: !prev[catValue] }));
  };

  const handleSelect = (catValue, subValue = null) => {
    // Notify parent component with selection
    onCategorySelect({ category: catValue, subcategory: subValue });
  };

  return (
    <div className="p-4 border-r sticky top-0">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories available</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat.value} className="mb-2">
              <div
                className="flex items-center cursor-pointer hover:text-accent"
                onClick={() => toggleExpand(cat.value)}
              >
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <span className="mr-2">
                    {expanded[cat.value] ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
                <span onClick={() => handleSelect(cat.value)}>{cat.label}</span>
              </div>
              {expanded[cat.value] && cat.subcategories && cat.subcategories.length > 0 && (
                <ul className="ml-6 mt-1">
                  {cat.subcategories.map((sub) => (
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
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
