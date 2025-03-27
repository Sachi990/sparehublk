// src/pages/AdminProductsPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  // Fetch products from the backend with pagination
  const fetchProducts = useCallback(async (currentPage = page) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/products', {
        headers: { Authorization: token },
        params: { page: currentPage, limit },
      });
      // If response is in expected wrapper format, use res.data.data
      // Otherwise, if response is an array, use it directly
      const data = res.data.data ? res.data.data : Array.isArray(res.data) ? res.data : [];
      setProducts(data);
      // Also set pagination data if available:
      if (res.data.currentPage && res.data.totalPages) {
        setPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Enter edit mode for a product
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditFormData({
      uniqueProductId: product.uniqueProductId || '',
      name: product.name,
      model: product.model,
      brand: product.brand,
      description: product.description,
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      buyingPrice: product.buyingPrice,
      category: product.category,
      subcategory: product.subcategory,
      productType: product.productType,
      featured: product.featured,
    });
  };

  // Handle changes in the inline edit form
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit updated product data
  const handleEditSubmit = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/products/${productId}`, editFormData, {
        headers: { Authorization: token },
      });
      toast.success('Product updated successfully');
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      toast.error('Failed to update product');
    }
  };

  // Delete a product
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/products/${productId}`, {
          headers: { Authorization: token },
        });
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error.response?.data || error.message);
        toast.error('Failed to delete product');
      }
    }
  };

  // Pagination handler (if applicable)
  const handlePageChange = (newPage) => {
    fetchProducts(newPage);
  };

  return (
    <motion.div className="container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Manage Products</h2>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/products/add"
            className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
          >
            Add New Product
          </Link>
          <button
            onClick={fetchProducts}
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Refresh
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-center py-4">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">SKU</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Brand</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.uniqueProductId}</td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        name="brand"
                        value={editFormData.brand}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      product.brand
                    )}
                  </td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        name="stock"
                        value={editFormData.stock}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        name="productType"
                        value={editFormData.productType}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      product.productType
                    )}
                  </td>
                  <td className="border p-2">
                    {editingProductId === product.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSubmit(product.id)}
                          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`py-1 px-3 rounded ${page === pageNum ? 'bg-accent text-black' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default AdminProductsPage;
