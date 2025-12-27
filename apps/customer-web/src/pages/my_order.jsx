import React, { useState } from 'react';
import { Home, ShoppingBag, MessageCircle, User, Minus, Plus, Trash2, Clock, CheckCircle, Utensils, ShoppingCart, Heart } from 'lucide-react';
import { NavLink } from "react-router-dom";
import './my_order.css';
import Hamburger from '../components/hamburger';

const MyOrderPage = () => {
  const [activeTab, setActiveTab] = useState('cart');
  const [favorites] = useState([]); // You can connect this to your actual favorites state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Caesar Salad',
      price: 8,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop',
      customizations: ['Extra Parmesan', 'No Croutons']
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      price: 18,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=120&fit=crop',
      customizations: ['Medium Rare', 'Extra Lemon']
    },
    {
      id: 3,
      name: 'Fresh Orange Juice',
      price: 4,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=120&h=120&fit=crop',
      customizations: []
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      status: 'ready',
      items: [
        { name: 'Chicken Wings', quantity: 1, price: 12 },
        { name: 'Iced Coffee', quantity: 2, price: 3 }
      ],
      total: 18,
      orderTime: '2:30 PM',
      estimatedTime: 'Ready for pickup'
    },
    {
      id: 'ORD002',
      status: 'preparing',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 14 },
        { name: 'Chocolate Cake', quantity: 1, price: 7 }
      ],
      total: 21,
      orderTime: '3:15 PM',
      estimatedTime: '10 mins remaining'
    },
    {
      id: 'ORD003',
      status: 'placed',
      items: [
        { name: 'Veggie Burger', quantity: 2, price: 13 },
        { name: 'Smoothie Bowl', quantity: 1, price: 6 }
      ],
      total: 32,
      orderTime: '3:45 PM',
      estimatedTime: '25 mins'
    }
  ]);

  const updateQuantity = (id, increment) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + increment);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'placed':
        return <Clock size={16} color="#d9b550" />;
      case 'preparing':
        return <Utensils size={16} color="#FF9800" />;
      case 'ready':
        return <CheckCircle size={16} color="#4CAF50" />;
      default:
        return <Clock size={16} color="#888888" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
        return '#d9b550';
      case 'preparing':
        return '#FF9800';
      case 'ready':
        return '#4CAF50';
      default:
        return '#888888';
    }
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: `ORD00${orders.length + 1}`,
      status: 'placed',
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      orderTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      estimatedTime: '30 mins'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setActiveTab('orders');
  };

  return (
    <div className="myorder-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Hamburger />

          {/* Favorites Icon */}

          <NavLink to="/likes" className="header-favorites-btn">
            <Heart
              size={24}
              color="#d9b550"
              fill={favorites.length > 0 ? '#d9b550' : 'transparent'}
            />
            {favorites.length > 0 && (
              <span className="favorites-count">{favorites.length}</span>
            )}
          </NavLink>
        </div>

        {/* Main Title */}
        <div className="main-title">
          <h1>My <span className="highlight">Orders</span></h1>
          <h1>& <span className="highlight">Cart</span></h1>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart ({cartItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders ({orders.length})
          </button>
        </div>
      </header>

      {/* Cart Content */}
      {activeTab === 'cart' && (
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={64} color="#888888" />
              <h3>Your cart is empty</h3>
              <p>Add some delicious items to your cart to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-info">
                      <div className="cart-header">
                        <h3>{item.name}</h3>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.customizations.length > 0 && (
                        <div className="customizations">
                          {item.customizations.map((custom, index) => (
                            <span key={index} className="custom-tag">{custom}</span>
                          ))}
                        </div>
                      )}
                      <div className="cart-bottom">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="item-price">
                          ₹{(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹2</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹{Math.round(getTotalPrice() * 0.08)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{getTotalPrice() + 2 + Math.round(getTotalPrice() * 0.08)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order
              </button>
            </>
          )}
        </div>
      )}

      {/* Orders Content */}
      {activeTab === 'orders' && (
        <div className="orders-content">
          {orders.length === 0 ? (
            <div className="empty-state">
              <Clock size={64} color="#888888" />
              <h3>No orders yet</h3>
              <p>Your order history will appear here once you place your first order!</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-id">
                      <span>Order #{order.id}</span>
                      <span className="order-time">{order.orderTime}</span>
                    </div>
                    <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                      {getStatusIcon(order.status)}
                      <span className="status-text">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="estimated-time">{order.estimatedTime}</div>
                    <div className="order-total">Total: ₹{order.total}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavLink to="/" className="nav-btn">
          <Home size={24} />
        </NavLink>

        <NavLink to="/menu" className="nav-btn">
          <ShoppingBag size={24} />
        </NavLink>

        <NavLink to="/orders" className="nav-btn">
          <ShoppingCart size={24} />
        </NavLink>

        <NavLink to="/profile" className="nav-btn">
          <User size={24} />
        </NavLink>
      </nav>
    </div>
  );
};

export default MyOrderPage;