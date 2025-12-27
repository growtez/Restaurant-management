import React, { useState, useEffect } from 'react';
import { Search, Heart, Home, ShoppingBag, MessageCircle, User, Star, Plus, ShoppingCart, X, Clock } from 'lucide-react';
import { NavLink } from "react-router-dom";
import './home.css';
import Hamburger from '../components/hamburger';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  useEffect(() => {
    const homeContainer = document.querySelector('.home-container');

    if (showItemModal) {
      document.body.classList.add('modal-open');
      if (homeContainer) {
        homeContainer.classList.add('modal-open');
      }
    } else {
      document.body.classList.remove('modal-open');
      if (homeContainer) {
        homeContainer.classList.remove('modal-open');
      }
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
      if (homeContainer) {
        homeContainer.classList.remove('modal-open');
      }
    };
  }, [showItemModal]);

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );

    // Add animation effect
    const button = document.activeElement;
    if (button) {
      button.style.transform = 'scale(1.3)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 200);
    }
  };

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollLeft;
    const scrollWidth = e.target.scrollWidth - e.target.clientWidth;
    const totalItems = featuredOffers.length;
    if (scrollWidth === 0) {
      setCurrentOfferIndex(0);
      return;
    }
    const newIndex = Math.round((scrollPosition / scrollWidth) * (totalItems - 1));
    setCurrentOfferIndex(newIndex);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const closeItemModal = () => {
    // Add closing classes for animation
    const overlay = document.querySelector('.item-modal-overlay');
    const content = document.querySelector('.item-modal-content');

    if (overlay) overlay.classList.add('closing');
    if (content) {
      content.classList.remove('slide-up');
      content.classList.add('slide-down');
    }

    // Wait for animation to complete before hiding modal
    setTimeout(() => {
      setShowItemModal(false);
      if (overlay) overlay.classList.remove('closing');
      if (content) content.classList.remove('slide-down');
    }, 400); // Match the closing transition duration (0.4s)

    // Clear selected item after everything is done
    setTimeout(() => {
      setSelectedItem(null);
    }, 400);
  };

  const featuredOffers = [
    {
      id: 'featured1',
      name: 'Special Pizza',
      price: 1231,
      time: '20min',
      rating: 4.5,
      discount: '20% Discount',
      subtitle: 'in 2 orders in 6 items',
      serves: 'Serves 2-3',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&h=120&fit=crop',
      description: 'Delicious special pizza with authentic Italian flavors, topped with premium ingredients and our signature sauce.'
    },
    {
      id: 'featured2',
      name: 'Burger Combo',
      price: 154,
      time: '25min',
      rating: 4.8,
      discount: '30% Off',
      subtitle: 'on combo meals',
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop',
      description: 'Juicy beef burger with crispy fries and refreshing drink. Perfect combo meal for a satisfying experience.'
    },
    {
      id: 'featured3',
      name: 'Pasta Special',
      price: 183,
      time: '30min',
      rating: 4.6,
      discount: 'Buy 1 Get 1',
      subtitle: 'on selected pasta',
      serves: 'Serves 1-2',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=120&h=120&fit=crop',
      description: 'Creamy pasta with rich sauce and fresh herbs. Made with premium Italian pasta and traditional recipes.'
    }
  ];

  // Most Popular/Liked Items
  const popularItems = [
    {
      id: 'popular1',
      name: 'Classic Margherita Pizza',
      price: 168,
      time: '25min',
      rating: 4.9,
      serves: 'Serves 2',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&h=120&fit=crop',
      description: 'Traditional Italian pizza with fresh mozzarella, tomato sauce, and basil leaves. A timeless classic that never disappoints.'
    },
    {
      id: 'popular2',
      name: 'Chicken Tikka Masala',
      price: 198,
      time: '30min',
      rating: 4.8,
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=120&h=120&fit=crop',
      description: 'Tender chicken pieces in a rich, creamy tomato-based curry sauce. Served with aromatic basmati rice.'
    },
    {
      id: 'popular3',
      name: 'Chocolate Lava Cake',
      price: 568,
      time: '15min',
      rating: 4.9,
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=120&h=120&fit=crop',
      description: 'Decadent chocolate cake with a molten chocolate center. Served warm with vanilla ice cream on the side.'
    },
    {
      id: 'popular4',
      name: 'Caesar Salad',
      price: 120,
      time: '10min',
      rating: 4.7,
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop',
      description: 'Fresh romaine lettuce with caesar dressing, parmesan cheese, and crunchy croutons. Light and refreshing.'
    }
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: 'recent1',
      name: 'Pepperoni Pizza',
      price: 148,
      time: '20min',
      rating: 4.6,
      orderDate: '2 days ago',
      serves: 'Serves 2',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&h=120&fit=crop',
      description: 'Classic pepperoni pizza with spicy pepperoni slices and melted mozzarella cheese on our signature crust.'
    },
    {
      id: 'recent2',
      name: 'Grilled Salmon',
      price: 228,
      time: '25min',
      rating: 4.8,
      orderDate: '1 week ago',
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=120&fit=crop',
      description: 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon herb butter.'
    },
    {
      id: 'recent3',
      name: 'Vegan Burger',
      price: 138,
      time: '20min',
      rating: 4.5,
      orderDate: '1 week ago',
      serves: 'Serves 1',
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=120&h=120&fit=crop',
      description: 'Plant-based burger patty with fresh vegetables, vegan cheese, and our special house sauce on a whole grain bun.'
    }
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Hamburger />

          <div className="header-right">
            {/* Cart Icon */}
            <NavLink to="/orders" className="liked-items-btn">
              <ShoppingCart size={24} color="#d9b550" />
              {cart.length > 0 && (
                <span className="liked-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              )}
            </NavLink>

            <div className="profile-avatar">
              <img src="/assets/pizza.jpg" alt="Profile" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="main-title">
          <h1>Find Your <span className="highlight">Best</span></h1>
          <h1><span className="highlight">Food</span> Around You</h1>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search your favourite food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="filter-icon">
            <div className="filter-lines">
              <div className="filter-line"></div>
              <div className="filter-line"></div>
              <div className="filter-line"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Discount Section */}
      <div className="categories-section">
        <div className="section-header">
          <h2>Discounts for you</h2>
          <NavLink to="/offers" className="see-all">See All</NavLink>
        </div>
      </div>

      {/* Featured Offer with Horizontal Scroll */}
      <div className="featured-offer-wrapper">
        <div className="featured-offers-scroll" onScroll={handleScroll}>
          {featuredOffers.map((offer, index) => (
            <div key={offer.id} className="featured-offer" onClick={() => handleItemClick(offer)}>
              <div className="offer-content">
                <div className="offer-text">
                  <h3 className="offer-name">{offer.name}</h3>
                  <div className="discount-badge">
                    <span className="discount-text">{offer.discount}</span>
                  </div>
                  <p className="offer-subtitle">{offer.subtitle}</p>
                  <div className="offer-meta">
                    <span className="time">{offer.time}</span>
                    <div className="rating">
                      <Star className="star-icon" size={14} fill="#d9b550" color="#d9b550" />
                      <span>{offer.rating}</span>
                    </div>
                  </div>
                  <div className="price">₹{offer.price}</div>
                </div>
                <div className="offer-image">
                  <img src={offer.image} alt={offer.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-dots">
          {featuredOffers.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentOfferIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Most Popular Section */}
      <div className="categories-section">
        <div className="section-header">
          <h2>Most Popular</h2>
          <NavLink to="/popular" className="see-all">See All</NavLink>
        </div>
      </div>

      {/* Popular Food Items */}
      <div className="food-items">
        {popularItems.map(item => (
          <div key={item.id} className="food-item" onClick={() => handleItemClick(item)}>
            <div className="food-image">
              <img src={item.image} alt={item.name} />
              <button
                className="favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
              >
                <Heart
                  size={18}
                  fill={favorites.includes(item.id) ? '#d9b550' : 'transparent'}
                  color={favorites.includes(item.id) ? '#d9b550' : '#FFFFFF'}
                />
              </button>
            </div>
            <div className="food-info">
              <div className="food-header">
                <h3>{item.name}</h3>
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="food-meta">
                <span className="time">{item.time}</span>
                <div className="rating">
                  <Star className="star-icon" size={12} fill="#FFD700" color="#FFD700" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="price">₹{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="categories-section recent-orders-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <NavLink to="/recent" className="see-all">View All</NavLink>
        </div>
      </div>

      {/* Recent Orders Items */}
      <div className="food-items">
        {recentOrders.map(item => (
          <div key={item.id} className="food-item" onClick={() => handleItemClick(item)}>
            <div className="food-image">
              <img src={item.image} alt={item.name} />
              <div className="order-badge">
                <span>{item.orderDate}</span>
              </div>
            </div>
            <div className="food-info">
              <div className="food-header">
                <h3>{item.name}</h3>
                <button
                  className="add-btn reorder-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  title="Reorder"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="food-meta">
                <span className="time">{item.time}</span>
                <div className="rating">
                  <Star className="star-icon" size={12} fill="#FFD700" color="#FFD700" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="price">₹{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Indicator - Now clickable */}
      {cart.length > 0 && (
        <NavLink to="/orders" className="cart-indicator">
          <span>{cart.reduce((total, item) => total + item.quantity, 0)} items in cart</span>
        </NavLink>
      )}

      {/* Clean Item Details Modal */}
      {showItemModal && selectedItem && (
        <div className={`item-modal-overlay ${showItemModal ? 'show' : ''}`} onClick={closeItemModal}>
          <div className={`item-modal-content ${showItemModal ? 'slide-up' : ''}`} onClick={(e) => e.stopPropagation()}>

            {/* Header: Just Item Name and Close */}
            <div className="modal-header-info">
              <h2 className="modal-item-name">{selectedItem.name}</h2>
              <button className="modal-close-btn" onClick={closeItemModal}>
                <X size={20} />
              </button>
            </div>

            {/* Large Image with Border Radius */}
            <div className="modal-main-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
              {selectedItem.discount && (
                <div className="modal-discount-badge">{selectedItem.discount}</div>
              )}
            </div>

            {/* Content Section */}
            <div className="modal-content-section">

              {/* Serving Information */}
              <div className="modal-serves-info">{selectedItem.serves}</div>

              {/* Time, Rating and ADD Button Row */}
              <div className="modal-time-rating-row">
                <div className="modal-time-rating-left">
                  <div className="modal-item-time">{selectedItem.time}</div>
                  <div className="modal-rating-section">
                    <Star size={16} fill="#d9b550" color="#d9b550" />
                    <span>{selectedItem.rating}</span>
                  </div>
                </div>
                <button
                  className="modal-main-add-btn"
                  onClick={() => {
                    addToCart(selectedItem);
                    closeItemModal();
                  }}
                >
                  ADD
                </button>
              </div>

              {/* Price */}
              <div className="modal-main-price">₹{selectedItem.price}</div>

              {/* Description */}
              <p className="modal-main-description">
                {selectedItem.description || `${selectedItem.name} with premium ingredients and authentic flavors.`}
              </p>

            </div>
          </div>
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

export default HomePage;