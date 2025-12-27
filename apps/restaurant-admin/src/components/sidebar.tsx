// Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

import pizzaLogo from "../assets/pizza.jpg"; // make sure spelling is 'assets' not 'assests'


interface NavItem {
  icon: string;
  label: string;
  id: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.includes('/orders')) return 'order';
    if (path.includes('/menu')) return 'menu';
    if (path.includes('/payments')) return 'payment';
    if (path.includes('/reports')) return 'report';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const navItems: NavItem[] = [
    { icon: '📊', label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: '📦', label: 'Order Management', id: 'order', path: '/orders' },
    { icon: '📋', label: 'Menu Management', id: 'menu', path: '/menu' },
    { icon: '💰', label: 'Payment Management', id: 'payment', path: '/payments' },
    { icon: '📈', label: 'Report and Analytics', id: 'report', path: '/reports' },
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <div className="sidebar">
      
      <div className="profile">
      <div className="profile-avatar">
        <img src={pizzaLogo} alt="log" className="avatar-img" />
      </div>
      <div className="profile-name">Pizza Hut</div>
    </div>

      <nav className="nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'nav-item-active' : ''}`}
            onClick={() => handleNavClick(item)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="help-button" onClick={() => navigate('/help')}>
        <span className="help-icon">❓</span>
        <span className="help-text">Help & Support</span>
      </div>
    </div>
  );
};

export default Sidebar;