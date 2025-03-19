// src/pages/AdminOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem('token');
    axios.get('/api/orders', { headers: { Authorization: token } })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error('Error fetching orders:', err.response?.data || err.message);
        toast.error('Failed to load orders');
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Manage Orders</h2>
      <button
        onClick={fetchOrders}
        className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition mb-4"
      >
        Refresh Orders
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Tracking Number</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.userId || 'Guest'}</td>
              <td className="border p-2">${order.total}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.trackingNumber || 'N/A'}</td>
              <td className="border p-2">
                <button className="bg-green-500 text-white py-1 px-2 rounded">Update Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersPage;
