// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // Options: 'dashboard', 'products', 'orders', 'reports', 'notifications'
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

  // Render Sales Chart for dashboard metrics using Chart.js
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
      } catch (error) {
        console.error('Error rendering sales chart:', error);
      }
    }
  }, [loading, activeSection, salesData]);

  // Calculate summary totals for dashboard cards
  const totalOrders = salesData.reduce((sum, report) => sum + report.order_count, 0);
  const totalRevenue = salesData.reduce((sum, report) => sum + report.total_revenue, 0);
  const totalProfit = profitData.reduce((sum, report) => sum + report.total_profit, 0);

  // Section Renderers
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/admin">Admin Dashboard</Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button onClick={() => setActiveSection('dashboard')} className="hover:text-accent transition">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('products')} className="hover:text-accent transition">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('orders')} className="hover:text-accent transition">
                  Orders
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('reports')} className="hover:text-accent transition">
                  Reports
                </button>
              </li>
              <li className="relative">
                <button onClick={() => setActiveSection('notifications')} className="hover:text-accent transition">
                  Notifications
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Dashboard Content */}
      <motion.main className="flex-grow container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {loading ? (
          <p className="text-center py-4">Loading dashboard data...</p>
        ) : (
          renderActiveSection()
        )}
      </motion.main>

      {/* Admin Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} SpareHub.LK Admin. All rights reserved.</p>
        <p>Contact support: admin@sparehub.lk</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
