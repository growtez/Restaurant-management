// Order.jsx
import React, { useState } from 'react';
import { Search, Bell, TrendingUp, ChevronDown, Filter } from 'lucide-react';
import Sidebar from '../components/sidebar';
import './order.css';

const Order = () => {
  const [selectedTable, setSelectedTable] = useState('All Tables');
  const [selectedPayment, setSelectedPayment] = useState('Payment Method');
  const [selectedStatus, setSelectedStatus] = useState('Status');

  const orders = [
    { 
      id: 'ORDER-234', 
      table: 'Table 7', 
      time: '12:35 PM', 
      status: 'New', 
      statusColor: 'yellow',
      paymentMethod: 'Cash',
      items: 'Butter Chicken, Naan x2, Lassi'
    },
    { 
      id: 'ORDER-235', 
      table: 'Table 3', 
      time: '12:30 PM', 
      status: 'Preparing', 
      statusColor: 'blue',
      paymentMethod: 'Online',
      items: 'Paneer Tikka, Rice, Coke'
    },
    { 
      id: 'ORDER-236', 
      table: 'Table 10', 
      time: '12:28 PM', 
      status: 'Ready', 
      statusColor: 'green',
      paymentMethod: 'Cash',
      items: 'Biryani, Raita, Salad'
    },
    { 
      id: 'ORDER-237', 
      table: 'Table 5', 
      time: '12:25 PM', 
      status: 'Served', 
      statusColor: 'teal',
      paymentMethod: 'Online',
      items: 'Masala Dosa, Coffee x2'
    },
    { 
      id: 'ORDER-238', 
      table: 'Table 12', 
      time: '12:20 PM', 
      status: 'New', 
      statusColor: 'yellow',
      paymentMethod: 'Cash',
      items: 'Tandoori Chicken, Roti x3'
    },
    { 
      id: 'ORDER-239', 
      table: 'Table 8', 
      time: '12:18 PM', 
      status: 'Preparing', 
      statusColor: 'blue',
      paymentMethod: 'Online',
      items: 'Dal Makhani, Jeera Rice, Papad'
    },
    { 
      id: 'ORDER-240', 
      table: 'Table 2', 
      time: '12:15 PM', 
      status: 'Ready', 
      statusColor: 'green',
      paymentMethod: 'Cash',
      items: 'Fish Curry, Rice, Pickle'
    },
    { 
      id: 'ORDER-241', 
      table: 'Table 15', 
      time: '12:10 PM', 
      status: 'Served', 
      statusColor: 'teal',
      paymentMethod: 'Online',
      items: 'Veg Thali, Buttermilk'
    }
  ];

  const getStatusClass = (color) => {
    return `status-${color}`;
  };

  return (
    <div className="order-container">
      <Sidebar />
      
      <div className="order-main-content">
        {/* Header */}
        <div className="order-header">
          <h1 className="order-page-title">Order Management</h1>
          <div className="order-header-right">
            <div className="order-search-bar">
              <Search size={18} color="#718096" />
              <input
                type="text"
                placeholder="Search orders..."
                className="order-search-input"
              />
            </div>
            <div className="order-icon-button">
              <Bell size={20} color="#718096" />
            </div>
            <div className="order-user-avatar">👨‍💼</div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="order-stats-grid">
          <div className="order-stat-card">
            <div className="order-card-top-bar order-card-green"></div>
            <h3 className="order-stat-title">Total Orders Today</h3>
            <div className="order-stat-number">125</div>
            <div className="order-stat-change">
              <span className="order-change-positive">+12% vs yesterday</span>
              <TrendingUp size={16} color="#68D391" className="order-trend-icon" />
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-card-top-bar order-card-blue"></div>
            <h3 className="order-stat-title">Total Orders This Week</h3>
            <div className="order-stat-number">850</div>
            <div className="order-stat-change">
              <span className="order-change-blue">+8% vs last week</span>
              <TrendingUp size={16} color="#7F9CF5" className="order-trend-icon" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="order-filter-section">
          <div className="order-filter-buttons">
            <button className="order-filter-btn">
              <span>All Tables</span>
              <ChevronDown size={18} />
            </button>
            <button className="order-filter-btn">
              <span>Payment Method</span>
              <ChevronDown size={18} />
            </button>
            <button className="order-filter-btn">
              <span>Status</span>
              <ChevronDown size={18} />
            </button>
          </div>
          <button className="order-filter-icon-btn">
            <Filter size={18} color="#718096" />
          </button>
        </div>

        {/* Order History Table */}
        <div className="order-table-card">
          <div className="order-table-header">
            <h2 className="order-table-title">Order History</h2>
          </div>
          <div className="order-table-wrapper">
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Table</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="order-id-cell">{order.id}</td>
                    <td>{order.table}</td>
                    <td>{order.time}</td>
                    <td>
                      <span className={`order-status-pill ${getStatusClass(order.statusColor)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className="order-payment-badge">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="order-items-cell">{order.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;