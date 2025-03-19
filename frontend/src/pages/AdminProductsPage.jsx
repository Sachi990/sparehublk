// src/pages/AdminProductsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const token = localStorage.getItem('token');
    axios.get('/api/products', { headers: { Authorization: token } })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Error fetching products:', err.response?.data || err.message);
        toast.error('Failed to load products');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Manage Products</h2>
      <button
        onClick={fetchProducts}
        className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition mb-4"
      >
        Refresh Products
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductsPage;
