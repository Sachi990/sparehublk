// src/components/ProductFilters.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function ProductFilters({ products = [], onFilterChange = () => {} }) {
  // Remove category options from here as it will be handled by the sidebar.
  
  // Get distinct brands and product types and models from products.
  const distinctBrands = Array.from(new Set(products.map(p => p.brand))).sort();
  const brandOptions = distinctBrands.map(brand => ({ value: brand, label: brand }));
  
  const distinctProductTypes = Array.from(new Set(products.map(p => p.productType))).sort();
  const productTypeOptions = distinctProductTypes.map(pt => ({ value: pt, label: pt }));

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [modelOptions, setModelOptions] = useState([]);

  // Update models based on selected brand
  useEffect(() => {
    if (selectedBrand) {
      const models = Array.from(
        new Set(
          products
            .filter(p => p.brand === selectedBrand.value)
            .map(p => p.model)
        )
      ).sort();
      setModelOptions(models.map(model => ({ value: model, label: model })));
    } else {
      setModelOptions([]);
      setSelectedModel(null);
    }
  }, [selectedBrand, products]);

  // Notify parent of changes
  useEffect(() => {
    onFilterChange({
      brand: selectedBrand?.value || '',
      model: selectedModel?.value || '',
      productType: selectedProductType?.value || '',
    });
  }, [selectedBrand, selectedModel, selectedProductType]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="w-full md:w-1/3">
        <Select
          value={selectedBrand}
          onChange={setSelectedBrand}
          options={brandOptions}
          placeholder="Select Brand"
          isClearable
        />
      </div>
      <div className="w-full md:w-1/3">
        <Select
          value={selectedModel}
          onChange={setSelectedModel}
          options={modelOptions}
          placeholder="Select Model"
          isClearable
          isDisabled={!selectedBrand}
        />
      </div>
      <div className="w-full md:w-1/3">
        <Select
          value={selectedProductType}
          onChange={setSelectedProductType}
          options={productTypeOptions}
          placeholder="Select Product Type"
          isClearable
        />
      </div>
    </div>
  );
}

export default ProductFilters;
