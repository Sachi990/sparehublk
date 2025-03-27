// src/pages/ProductList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductFilters from '../components/ProductFilters';
import CategoryTree from '../components/CategoryTree';
import { motion } from 'framer-motion';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SkeletonCard = () => (
  <div className="animate-pulse border rounded p-4">
    <div className="bg-gray-300 h-48 mb-4 rounded"></div>
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

function ProductList() {
  const [products, setProducts] = useState([]);
  // Filters: category and subcategory come from CategoryTree; other filters come from ProductFilters
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    model: '',
    productType: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  // Function to fetch products from the API
  const fetchProducts = useCallback(
    async (currentFilters = filters, currentPage = page) => {
      try {
        setLoading(true);
        // Build query parameters from filters and search term
        const queryParams = new URLSearchParams();
        if (currentFilters.category) queryParams.append('category', currentFilters.category);
        if (currentFilters.subcategory) queryParams.append('subcategory', currentFilters.subcategory);
        if (currentFilters.brand) queryParams.append('brand', currentFilters.brand);
        if (currentFilters.model) queryParams.append('model', currentFilters.model);
        if (currentFilters.productType) queryParams.append('productType', currentFilters.productType);
        if (searchTerm) queryParams.append('search', searchTerm);
        queryParams.append('page', currentPage);
        queryParams.append('limit', 10);

        console.log("Fetching products with params:", queryParams.toString());
        const res = await axios.get(`/api/products?${queryParams.toString()}`);
        console.log("Products response:", res.data);

        // Expect a wrapped response { total, currentPage, totalPages, data }
        let data = [];
        if (res.data && typeof res.data === 'object' && 'data' in res.data) {
          data = res.data.data;
          setPage(res.data.currentPage || 1);
          setTotalPages(res.data.totalPages || 1);
        } else if (Array.isArray(res.data)) {
          data = res.data;
          setPage(1);
          setTotalPages(1);
        }
        setProducts(data);
      } catch (error) {
        console.error("Fetch products error:", error.response?.data || error.message);
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    },
    [filters, searchTerm, page]
  );

  // On mount, apply initial URL query filters (except category/subcategory, which come from the sidebar)
  useEffect(() => {
    const initialFilters = {
      brand: query.get('brand') || '',
      model: query.get('model') || '',
      productType: query.get('productType') || '',
    };
    setFilters(prev => ({ ...prev, ...initialFilters }));
    fetchProducts(initialFilters, 1);
  }, [query, fetchProducts]);

  // When additional filters change via the ProductFilters component
  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters, 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    fetchProducts(filters, newPage);
  };

  // Handler for the CategoryTree component selection
  const handleCategorySelect = ({ category, subcategory }) => {
    const updatedFilters = { ...filters, category, subcategory };
    setFilters(updatedFilters);
    fetchProducts(updatedFilters, 1);
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h2 className="text-2xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Products
      </motion.h2>
      <div className="flex flex-col md:flex-row">
        {/* CategoryTree Sidebar */}
        <div className="md:w-1/4">
          <CategoryTree onSelectCategory={handleCategorySelect} />
        </div>
        {/* Main Content */}
        <div className="md:w-3/4 md:pl-4">
          <ProductFilters onFilterChange={handleFilterChange} />
          <div className="mb-4 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border p-2 rounded"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              onClick={() => fetchProducts(filters, 1)}
              className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Search
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                <p className="text-center text-gray-600">
                  No products found. Try adjusting your filters or search term.
                </p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="border p-4 rounded hover:shadow-lg transition transform hover:scale-105"
                    >
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                          alt={product.name}
                          className="w-full h-48 object-cover mb-2 rounded"
                          loading="lazy"
                        />
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        {product.uniqueProductId && (
                          <p className="text-sm text-gray-500">ID: {product.uniqueProductId}</p>
                        )}
                        {product.featured && (
                          <span className="bg-yellow-300 text-xs px-2 py-1 rounded inline-block mt-1">
                            Featured
                          </span>
                        )}
                      </Link>
                      <p className="text-accent font-semibold mt-2">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </p>
                      {product.discount > 0 && (
                        <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`py-1 px-3 rounded ${
                        page === pageNum ? 'bg-accent text-black' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
