// src/components/SearchAutoComplete.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const DEBOUNCE_DELAY = 300;

function SearchAutoComplete({ onSelectSuggestion, placeholder = "Search products..." }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/search/advanced?query=${encodeURIComponent(query)}`);
        console.log('Advanced suggestion response:', res.data);
        setSuggestions(res.data.suggestions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching advanced suggestions:", error);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center border rounded p-2">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full focus:outline-none"
          onFocus={() => query && setShowSuggestions(true)}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-t-0 rounded-b shadow-md max-h-64 overflow-y-auto">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.name} - {suggestion.brand} {suggestion.model && `(${suggestion.model})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchAutoComplete;
