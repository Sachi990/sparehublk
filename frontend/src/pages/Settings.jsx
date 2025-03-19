// In App.jsx (or a dedicated SettingsPage.jsx)
import React from 'react';
import SettingsPanel from './components/SettingsPanel';

function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <SettingsPanel />
      {/* Optionally include other settings components here (e.g., Change Password, Update Avatar, etc.) */}
    </div>
  );
}

export default SettingsPage;
