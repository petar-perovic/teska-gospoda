import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar.js';
import AdminAll from '../components/AdminAll.js';
import AdminLogSearch from '../components/AdminLogSearch.js';
import AdminFive from '../components/AdminFive.js';
import AdminErrors from '../components/AdminErrors.js';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content section-header">
        {activeTab === 'prvi' && <AdminAll activeTab={activeTab} />}
        {activeTab === 'drugi' && <AdminFive activeTab={activeTab} />}
        {activeTab === 'treci' && <AdminErrors activeTab={activeTab} />}
        {activeTab === 'cetvrti' && <AdminLogSearch activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default AdminDashboard;