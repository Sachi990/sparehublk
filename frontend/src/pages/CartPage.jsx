// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-accent text-2xl mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-primary">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b border-gray-700 py-2 transition-all duration-300 hover:bg-gray-200">
                <div>
                  <p className="text-primary">{item.name} (x{item.quantity})</p>
                  <p className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-primary text-xl">Total: ${totalPrice.toFixed(2)}</h2>
            <Link to="/checkout" className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
