import React, { useState, useRef } from 'react';
import {
  Home, ShoppingBag, User, Edit2, ShoppingCart,
  LogOut, Camera, ChevronRight, Gift, Heart,
  Clock, Settings, Moon, Sun
} from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import './profile.css';
import Hamburger from '../components/hamburger';

const ProfilePage = () => {
  const { theme, themeMode, toggleTheme, isDark } = useTheme();

  const [userProfile, setUserProfile] = useState({
    name: 'S & S',
    email: 's&s123@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    preferences: {
      notifications: true,
      offers: true,
      language: 'English',
      theme: 'dark'
    },
    stats: {
      totalOrders: 24,
      favoriteItems: 8,
      loyaltyPoints: 1250,
      membershipTier: 'Gold'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setUserProfile({ ...editForm });
    } else {
      setEditForm({ ...userProfile });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserProfile(prev => ({
        ...prev,
        avatar: imageUrl
      }));
      setSelectedFile(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <Clock size={27} />,
      title: "Order History",
      description: "View past orders and reorder",
      to: "/recent",
    },
    {
      icon: <Heart size={27} />,
      title: "Favorites",
      description: "Your favorite restaurants & dishes",
      to: "/likes",
    },
    {
      icon: <Gift size={27} />,
      title: "Offers & Rewards",
      description: `${userProfile.stats.loyaltyPoints} points • ${userProfile.stats.membershipTier} Member`,
      to: "/offers",
    },
    {
      icon: <Settings size={27} />,
      title: "Settings",
      description: "App preferences and theme",
      to: "/settings",
    },
  ];

  return (
    <div className="profile-container" style={{ backgroundColor: theme.background }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Header */}
      <header className="header" style={{ backgroundColor: theme.background }}>
        <div className="header-content">
          <Hamburger />
          <div className="profile-badge" style={{ backgroundColor: theme.card }}>
            <User size={20} color={theme.primary} />
          </div>
        </div>

        <div className="main-title">
          <h1 style={{ color: theme.text }}>My <span className="highlight">Profile</span></h1>
        </div>
      </header>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header" style={{ backgroundColor: theme.card }}>
          <div className="avatar-container">
            <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
            <button className="avatar-edit-btn" onClick={handleCameraClick} style={{ backgroundColor: theme.primary }}>
              <Camera size={16} color="#1a1a1a" />
            </button>
          </div>
          <div className="profile-info">
            <h2 style={{ color: theme.text }}>{userProfile.name}</h2>
            <p className="profile-email" style={{ color: theme.textSecondary }}>{userProfile.email}</p>
            <p className="membership-badge" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>{userProfile.stats.membershipTier} Member</p>
          </div>
          <button className="edit-profile-btn" onClick={handleEditToggle} style={{ backgroundColor: theme.inputBg }}>
            <Edit2 size={16} color={theme.primary} />
          </button>
        </div>

        {/* Theme Quick Toggle */}
        <div className="theme-toggle-card" style={{ backgroundColor: theme.card }}>
          <div className="theme-toggle-icon" style={{ backgroundColor: `${theme.primary}15` }}>
            {isDark ? <Moon size={20} color={theme.primary} /> : <Sun size={20} color={theme.primary} />}
          </div>
          <div className="theme-toggle-info">
            <span className="theme-toggle-label" style={{ color: theme.text }}>Theme</span>
            <span className="theme-toggle-value" style={{ color: theme.textMuted }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <button
            className="theme-switch-btn"
            style={{ backgroundColor: theme.inputBg }}
            onClick={() => toggleTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <Sun size={18} color={theme.textMuted} /> : <Moon size={18} color={theme.textMuted} />}
          </button>
        </div>

        {/* Profile Details */}
        {isEditing ? (
          <div className="edit-form" style={{ backgroundColor: theme.card }}>
            <div className="form-group">
              <label style={{ color: theme.textSecondary }}>Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="form-input"
                style={{ backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }}
              />
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleEditToggle} style={{ backgroundColor: theme.primary }}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)} style={{ backgroundColor: theme.inputBg, color: theme.text }}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card" style={{ backgroundColor: theme.card }}>
            <div className="stat-number" style={{ color: theme.primary }}>{userProfile.stats.totalOrders}</div>
            <div className="stat-label" style={{ color: theme.textMuted }}>Total Orders</div>
          </div>
          <div className="stat-card" style={{ backgroundColor: theme.card }}>
            <div className="stat-number" style={{ color: theme.primary }}>{userProfile.stats.favoriteItems}</div>
            <div className="stat-label" style={{ color: theme.textMuted }}>Favorites</div>
          </div>
          <div className="stat-card" style={{ backgroundColor: theme.card }}>
            <div className="stat-number" style={{ color: theme.primary }}>{userProfile.stats.loyaltyPoints}</div>
            <div className="stat-label" style={{ color: theme.textMuted }}>Points</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-section">
          <div className="menu-list" style={{ backgroundColor: theme.card }}>
            {menuItems.map((item, index) =>
              item.to ? (
                <NavLink key={index} to={item.to} className="menu-item" style={{ borderBottomColor: theme.border }}>
                  <div className="menu-icon" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>{item.icon}</div>
                  <div className="menu-info">
                    <div className="menu-title" style={{ color: theme.text }}>{item.title}</div>
                    <div className="menu-description" style={{ color: theme.textMuted }}>{item.description}</div>
                  </div>
                  <ChevronRight size={16} className="menu-arrow" color={theme.textMuted} />
                </NavLink>
              ) : (
                <button key={index} className="menu-item" onClick={item.action} style={{ borderBottomColor: theme.border }}>
                  <div className="menu-icon" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>{item.icon}</div>
                  <div className="menu-info">
                    <div className="menu-title" style={{ color: theme.text }}>{item.title}</div>
                    <div className="menu-description" style={{ color: theme.textMuted }}>{item.description}</div>
                  </div>
                  <ChevronRight size={16} className="menu-arrow" color={theme.textMuted} />
                </button>
              )
            )}
          </div>
        </div>

        {/* Login Button */}
        <button className="login-btn" onClick={() => navigate("/login")} style={{ backgroundColor: theme.primary }}>
          <LogOut size={16} color="#1a1a1a" />
          <span>Log in</span>
        </button>

        {/* Logout Button */}
        <button className="signout-btn" style={{ backgroundColor: `${theme.error}15`, color: theme.error }}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" style={{ backgroundColor: theme.card, borderTopColor: theme.border }}>
        <NavLink to="/" className="nav-btn">
          <Home size={24} color={theme.textMuted} />
        </NavLink>

        <NavLink to="/menu" className="nav-btn">
          <ShoppingBag size={24} color={theme.textMuted} />
        </NavLink>

        <NavLink to="/orders" className="nav-btn">
          <ShoppingCart size={24} color={theme.textMuted} />
        </NavLink>

        <NavLink to="/profile" className="nav-btn active" style={{ backgroundColor: isDark ? '#333' : '#e0e0e0' }}>
          <User size={24} color={theme.text} />
        </NavLink>
      </nav>
    </div>
  );
};

export default ProfilePage;