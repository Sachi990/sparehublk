// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const SettingsMenu = lazy(() => import('./components/SettingsMenu'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminProductsPage = lazy(() => import('./pages/AdminProductsPage'));
const AdminAddProductPage = lazy(() => import('./pages/AdminAddProductPage'));
const AdminOrdersPage = lazy(() => import('./pages/AdminOrdersPage'));

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-light text-primary">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/settings" element={<SettingsMenu />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <AdminRoute>
                      <AdminProductsPage />
                    </AdminRoute>
                  }
                />
                <Route 
                  path="/admin/products/add" 
                  element={
                    <AdminRoute>
                      <AdminAddProductPage />
                    </AdminRoute>
                  }
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <AdminRoute>
                      <AdminOrdersPage />
                    </AdminRoute>
                  }
                />
                {/* Additional admin routes as needed */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
