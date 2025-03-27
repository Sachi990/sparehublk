// src/components/AdminFooter.jsx
import React from 'react';

function AdminFooter() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center border-t border-gray-700">
      <p>&copy; {new Date().getFullYear()} SpareHub.LK Admin. All rights reserved.</p>
      <p>For support, contact admin@sparehub.lk</p>
    </footer>
  );
}

export default AdminFooter;
