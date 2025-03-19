import React from 'react';

function CheckoutProgress({ step }) {
  const steps = ['Cart', 'Shipping', 'Payment'];
  return (
    <div className="flex justify-around my-4">
      {steps.map((s, index) => (
        <div
          key={index}
          className={`flex-1 text-center py-2 rounded mx-1 transition-colors duration-300 ${
            step === index + 1 ? 'bg-accent text-black' : 'bg-gray-800 text-light'
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

export default CheckoutProgress;
