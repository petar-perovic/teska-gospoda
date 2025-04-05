import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li
          className={activeTab === 'prvi' ? 'active' : ''}
          onClick={() => setActiveTab('prvi')}
        >
          <i className="bi bi-bar-chart-fill"></i> Prvi zadatak
        </li>
        <li
          className={activeTab === 'drugi' ? 'active' : ''}
          onClick={() => setActiveTab('drugi')}
        >
          <i className="bi bi-exclamation-octagon"></i> Drugi zadatak
        </li>
        <li
          className={activeTab === 'treci' ? 'active' : ''}
          onClick={() => setActiveTab('treci')}
        >
          <i className="bi bi-file-earmark-check"></i> Treći zadatak
        </li>
        <li
          className={activeTab === 'cetvrti' ? 'active' : ''}
          onClick={() => setActiveTab('cetvrti')}
        >
          <i className="bi bi-filter-circle"></i> Četvrti zadatak
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;