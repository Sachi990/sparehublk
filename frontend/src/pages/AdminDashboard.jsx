// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'products', 'orders', 'reports', 'notifications'
  const [salesData, setSalesData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [inventory, setInventory] = useState({ inventory: [], lowStock: [] });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard reports if dashboard or reports section is active
  useEffect(() => {
    async function fetchReports() {
      try {
        const token = localStorage.getItem('token');
        const [salesRes, profitRes, inventoryRes] = await Promise.all([
          axios.get('/api/reports/sales', { headers: { Authorization: token } }),
          axios.get('/api/reports/profit', { headers: { Authorization: token } }),
          axios.get('/api/reports/inventory', { headers: { Authorization: token } })
        ]);
        setSalesData(salesRes.data); // Expected: [{ month, order_count, total_revenue }, ...]
        setProfitData(profitRes.data); // Expected: [{ month, total_revenue, total_profit }, ...]
        setInventory(inventoryRes.data); // Expected: { inventory: [...], lowStock: [...] }
      } catch (error) {
        console.error('Error fetching reports:', error.response?.data || error.message);
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    }
    if (activeSection === 'dashboard' || activeSection === 'reports') {
      fetchReports();
    } else {
      setLoading(false);
    }
  }, [activeSection]);

  // Render Sales Chart when in Dashboard section and salesData is available
  useEffect(() => {
    if (!loading && activeSection === 'dashboard' && salesData.length > 0) {
      const canvas = document.getElementById('salesChart');
      if (!canvas) {
        console.error('Canvas element not found!');
        return;
      }
      const ctx = canvas.getContext('2d');
      try {
        if (window.salesChartInstance) {
          window.salesChartInstance.destroy();
        }
        window.salesChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: salesData.map(report => report.month),
            datasets: [{
              label: 'Monthly Revenue ($)',
              data: salesData.map(report => report.total_revenue),
              backgroundColor: '#F7B500'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        console.log('Sales chart rendered successfully');
      } catch (error) {
        console.error('Error rendering sales chart:', error);
      }
    }
  }, [loading, activeSection, salesData]);

  // Calculate summary totals for dashboard cards
  const totalOrders = salesData.reduce((sum, report) => sum + report.order_count, 0);
  const totalRevenue = salesData.reduce((sum, report) => sum + report.total_revenue, 0);
  const totalProfit = profitData.reduce((sum, report) => sum + report.total_profit, 0);

  // Render content for each section
  const renderDashboardSection = () => (
    <>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Monthly Sales Revenue</h3>
        <div className="border border-gray-300 rounded">
          <canvas id="salesChart" className="w-full h-64"></canvas>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Total Revenue</h3>
          <p>${totalRevenue}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="font-bold">Total Profit</h3>
          <p>${totalProfit}</p>
        </div>
      </div>
    </>
  );

  const renderProductsSection = () => (
    <div>
      <h3 className="text-2xl font-bold mb-4">Manage Products</h3>
      <ul className="list-disc ml-6">
        <li><Link to="/admin/products">View & Manage Products</Link></li>
        <li><Link to="/admin/products/add">Add New Product</Link></li>
        <li><Link to="/admin/products/featured">View Featured Products</Link></li>
      </ul>
    </div>
  );

  const renderOrdersSection = () => (
    <div>
      <h3 className="text-2xl font-bold mb-4">Manage Orders</h3>
      <ul className="list-disc ml-6">
        <li><Link to="/admin/orders">View All Orders</Link></li>
        <li><Link to="/admin/orders/pending">Pending Orders</Link></li>
        <li><Link to="/admin/orders/completed">Completed Orders</Link></li>
      </ul>
    </div>
  );

  const renderReportsSection = () => (
    <div>
      <h3 className="text-2xl font-bold mb-4">View Reports</h3>
      <ul className="list-disc ml-6">
        <li><Link to="/admin/reports/sales">Sales Report</Link></li>
        <li><Link to="/admin/reports/profit">Profit Report</Link></li>
        <li><Link to="/admin/reports/inventory">Inventory Report</Link></li>
      </ul>
    </div>
  );

  const renderNotificationsSection = () => (
    <div>
      <h3 className="text-2xl font-bold mb-4">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="list-disc ml-6">
          {notifications.map(note => (
            <li key={note.id}>{note.message}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'products':
        return renderProductsSection();
      case 'orders':
        return renderOrdersSection();
      case 'reports':
        return renderReportsSection();
      case 'notifications':
        return renderNotificationsSection();
      default:
        return renderDashboardSection();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => setActiveSection('dashboard')} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          Dashboard
        </button>
        <button onClick={() => setActiveSection('products')} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          Products
        </button>
        <button onClick={() => setActiveSection('orders')} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          Orders
        </button>
        <button onClick={() => setActiveSection('reports')} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
          Reports
        </button>
        <button onClick={() => setActiveSection('notifications')} className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition relative">
          Notifications
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
      </div>
      {loading ? <p>Loading dashboard data...</p> : renderActiveSection()}
    </motion.div>
  );
}

export default AdminDashboard;
