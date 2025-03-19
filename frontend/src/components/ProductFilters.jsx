// src/components/ProductFilters.jsx
import React, { useState, useEffect } from 'react';

// Define fixed categories with internal values and display names
const categoryOptions = [
  { value: '', label: 'Select Category' },
  { value: 'genuine', label: 'Genuine Original Parts' },
  { value: 'branded', label: 'Branded Parts' },
  { value: 'non-branded', label: 'Non-Branded Parts' },
];

function ProductFilters({ products, onFilterChange }) {
  // Compute distinct brands from the products array
  const distinctBrands = Array.from(new Set(products.map(p => p.brand))).sort();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modelOptions, setModelOptions] = useState([]);

  // When selectedBrand changes, update model options based on the products
  useEffect(() => {
    if (selectedBrand) {
      const models = Array.from(
        new Set(products.filter(p => p.brand === selectedBrand).map(p => p.model))
      ).sort();
      setModelOptions(models);
    } else {
      setModelOptions([]);
      setSelectedModel("");
    }
  }, [selectedBrand, products]);

  // Notify parent component whenever filters change
  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      brand: selectedBrand,
      model: selectedModel,
    });
  }, [selectedCategory, selectedBrand, selectedModel, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        {categoryOptions.map((cat, idx) => (
          <option key={idx} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Brand</option>
        {distinctBrands.map((brand, idx) => (
          <option key={idx} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="border p-2 rounded"
        disabled={!selectedBrand}
      >
        <option value="">Select Model</option>
        {modelOptions.map((model, idx) => (
          <option key={idx} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilters;
