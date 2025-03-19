// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutProgress from '../components/CheckoutProgress';
import axios from 'axios';
import { toast } from 'react-toastify';

function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGuestInfoChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    let orderResponse;
    try {
      if (token) {
        orderResponse = await axios.post(
          '/api/orders',
          { total: calculateTotal() },
          { headers: { Authorization: token } }
        );
      } else {
        orderResponse = await axios.post(
          '/api/orders/guest',
          {
            guestName: guestInfo.name,
            guestEmail: guestInfo.email,
            total: calculateTotal()
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      // Skip actual payment integration for now; simulate success.
      setOrderStatus({ message: 'Order placed successfully!' });
      clearCart();
      toast.success('Order placed successfully!');
      setLoading(false);
      setStep(1); // Reset to first step after submission
    } catch (error) {
      toast.error('Failed to place order');
      console.error('Order submission error:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <CheckoutProgress step={step} />
      
      {loading && (
        <div className="text-center my-4">
          <p>Submitting your order, please wait...</p>
        </div>
      )}
      
      {!loading && step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Review Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id}>
                <p>
                  {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                </p>
              </div>
            ))
          )}
          <p className="mt-4 font-semibold">Total: ${calculateTotal()}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setStep(2)}
              className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
              disabled={cartItems.length === 0}
            >
              Continue to Shipping
            </button>
          </div>
        </div>
      )}

      {!loading && step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <div>
            <p className="mb-2">Please enter your shipping details below:</p>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={guestInfo.name}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={guestInfo.email}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={guestInfo.address}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={guestInfo.phone}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={guestInfo.city}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={guestInfo.country}
              onChange={handleGuestInfoChange}
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {!loading && step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Information</h2>
          <p>Select Payment Method:</p>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 mb-4 w-full"
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
            <option value="payhere">PayHere</option>
          </select>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              onClick={submitOrder}
              className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Submit Order
            </button>
          </div>
          {orderStatus && (
            <div className="mt-4">
              <p>Order Status: {orderStatus.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
