// src/pages/AdminAddProductPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminAddProductPage() {
  const [productData, setProductData] = useState({
    name: '',
    model: '',
    brand: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    images: '' // Comma-separated URLs
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...productData,
        price: parseFloat(productData.price),
        discount: productData.discount ? parseFloat(productData.discount) : 0,
        stock: parseInt(productData.stock, 10),
        images: productData.images
          ? productData.images.split(',').map(url => url.trim())
          : [],
      };
      await axios.post('/api/products', payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      });
      toast.success('Product added successfully!');
      // Reset the form after successful submission
      setProductData({
        name: '',
        model: '',
        brand: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
        images: ''
      });
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-primary mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={productData.model}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-primary mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-primary mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-primary mb-1">Discount (%)</label>
            <input
              type="number"
              step="0.01"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-primary mb-1">Images (comma-separated URLs)</label>
            <input
              type="text"
              name="images"
              value={productData.images}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProductPage;
