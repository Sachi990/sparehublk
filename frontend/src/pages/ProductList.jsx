// src/pages/ProductList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';
import AddToCartButton from '../components/AddToCartButton';
import ProductFilters from '../components/ProductFilters';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', brand: '', model: '', search: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const query = useQuery();

  // Prepopulate filters from query parameters if provided
  useEffect(() => {
    const initialFilters = {
      category: query.get('category') || '',
      brand: query.get('brand') || '',
      model: query.get('model') || '',
      search: query.get('search') || '',
    };
    setFilters(initialFilters);
    fetchProducts(initialFilters);
  }, [query]);

  // Fetch products with current filters and search term
  const fetchProducts = useCallback((currentFilters = filters) => {
    const queryParams = new URLSearchParams();
    if (currentFilters.category) queryParams.append('category', currentFilters.category);
    if (currentFilters.brand) queryParams.append('brand', currentFilters.brand);
    if (currentFilters.model) queryParams.append('model', currentFilters.model);
    if (searchTerm) queryParams.append('search', searchTerm);
    axios.get(`/api/products?${queryParams.toString()}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Fetch products error:', err));
  }, [filters, searchTerm]);

  // Update filters via the ProductFilters component
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Dynamic Filters Section */}
      <ProductFilters products={products} onFilterChange={handleFilterChange} />

      {/* Main Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => fetchProducts()} className="bg-accent text-black py-2 px-4 rounded">
          Search
        </button>
      </div>

      {/* Products Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <li key={product.id} className="border p-4 rounded hover:shadow-lg transition">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="font-bold text-lg">{product.name}</h3>
            </Link>
            <p className="text-accent font-semibold">
              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
            </p>
            {product.discount > 0 && (
              <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
            )}
            <div className="flex space-x-2 mt-2">
              <WishlistButton productId={product.id} />
              <AddToCartButton product={product} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
