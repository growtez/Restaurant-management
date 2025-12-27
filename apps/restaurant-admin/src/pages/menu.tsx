import React, { useState } from 'react';
import { Search, Bell, Plus, Edit3, Trash2} from 'lucide-react';
import Sidebar from '../components/sidebar';
import MenuDialog from '../components/menu_dialog';
import OfferDialog from '../components/offer_dialog';
import './menu.css';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('menu-items');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([
    { 
      id: 1, 
      name: 'Butter Chicken', 
      price: 420, 
      image: '🍗', 
      inStock: true,
      category: 'Main Course'
    },
    { 
      id: 2, 
      name: 'Paneer Tikka', 
      price: 350, 
      image: '🧀', 
      inStock: true,
      category: 'Starters'
    },
    { 
      id: 3, 
      name: 'Masala Dosa', 
      price: 180, 
      image: '🥘', 
      inStock: false,
      category: 'Main Course'
    },
    { 
      id: 4, 
      name: 'Biryani', 
      price: 380, 
      image: '🍚', 
      inStock: true,
      category: 'Main Course'
    },
    { 
      id: 5, 
      name: 'Gulab Jamun', 
      price: 120, 
      image: '🍮', 
      inStock: true,
      category: 'Desserts'
    },
    { 
      id: 6, 
      name: 'Tandoori Roti', 
      price: 45, 
      image: '🫓', 
      inStock: false,
      category: 'Breads'
    },
    { 
      id: 7, 
      name: 'Mango Lassi', 
      price: 80, 
      image: '🥤', 
      inStock: true,
      category: 'Drinks'
    }
  ]);

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'Flat 20% Off',
      description: 'On all Main Course items',
      dishName: 'All Main Course',
      originalPrice: 420,
      discountedPrice: 336,
      isActive: true,
      validUntil: '2025-10-15'
    },
    {
      id: 2,
      title: 'Buy 1 Get 1 Free',
      description: 'On Gulab Jamun',
      dishName: 'Gulab Jamun',
      originalPrice: 120,
      discountedPrice: 120,
      isActive: true,
      validUntil: '2025-10-10'
    },
    {
      id: 3,
      title: 'Weekend Special',
      description: '15% off on Biryani',
      dishName: 'Biryani',
      originalPrice: 380,
      discountedPrice: 323,
      isActive: false,
      validUntil: '2025-10-08'
    }
  ]);

  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const categories = ['All', 'Starters', 'Main Course', 'Drinks', 'Desserts', 'Breads'];

  const filteredMenuItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const toggleStock = (id: number) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const toggleOffer = (id: number) => {
    setOffers(offers => 
      offers.map(offer => 
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
    );
  };

  const handleAddMenuItem = () => {
    setDialogMode('add');
    setSelectedMenuItem(null);
    setMenuDialogOpen(true);
  };

  const handleEditMenuItem = (item: any) => {
    setDialogMode('edit');
    setSelectedMenuItem(item);
    setMenuDialogOpen(true);
  };

  const handleSaveMenuItem = (item: any) => {
    if (dialogMode === 'add') {
      const newItem = {
        ...item,
        id: Math.max(...menuItems.map(i => i.id), 0) + 1
      };
      setMenuItems([...menuItems, newItem]);
    } else {
      setMenuItems(items =>
        items.map(i => i.id === item.id ? item : i)
      );
    }
  };

  const handleAddOffer = () => {
    setDialogMode('add');
    setSelectedOffer(null);
    setOfferDialogOpen(true);
  };

  const handleEditOffer = (offer: any) => {
    setDialogMode('edit');
    setSelectedOffer(offer);
    setOfferDialogOpen(true);
  };

  const handleSaveOffer = (offer: any) => {
    if (dialogMode === 'add') {
      const newOffer = {
        ...offer,
        id: Math.max(...offers.map(o => o.id), 0) + 1
      };
      setOffers([...offers, newOffer]);
    } else {
      setOffers(offerList =>
        offerList.map(o => o.id === offer.id ? offer : o)
      );
    }
  };

  const handleDeleteOffer = (id: number) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };

  const activeItems = menuItems.filter(item => item.inStock).length;
  const outOfStockItems = menuItems.filter(item => !item.inStock).length;
  const topSellingItem = 'Butter Chicken';

  return (
    <div className="menu-container">
      <Sidebar />
      
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="page-title">Menu Management</h1>
          <div className="header-right">
            <div className="search-bar">
              <Search size={18} color="#718096" />
              <input
                type="text"
                placeholder="Search menu items..."
                className="search-input"
              />
            </div>
            <div className="icon-button">
              <Bell size={20} color="#718096" />
            </div>
            <div className="user-avatar">👨‍💼</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stats-card">
            <div className="card-top-bar card-top-bar-green"></div>
            <h3 className="card-title">Active Menu Items</h3>
            <div className="stats-number">{activeItems}</div>
            <div className="stats-subtitle">Currently available</div>
          </div>

          <div className="stats-card">
            <div className="card-top-bar card-top-bar-red"></div>
            <h3 className="card-title">Out of Stock Items</h3>
            <div className="stats-number">{outOfStockItems}</div>
            <div className="stats-subtitle">Need restocking</div>
          </div>

          <div className="stats-card">
            <div className="card-top-bar card-top-bar-blue"></div>
            <h3 className="card-title">Top Selling Items (This Week)</h3>
            <div className="top-selling-item">
              <span className="top-selling-emoji">🍗</span>
              <span className="top-selling-name">{topSellingItem}</span>
            </div>
            <div className="stats-subtitle">45 orders this week</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'menu-items' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu-items')}
          >
            Menu Items
          </button>
          <button 
            className={`tab-button ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            Offers
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'menu-items' && (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Menu Items</h2>
              <button className="add-button" onClick={handleAddMenuItem}>
                <Plus size={16} />
                Add New Item
              </button>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="menu-grid">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="menu-card">
                  <div className="menu-image">{item.image}</div>
                  <div className="menu-info">
                    <h3 className="menu-name">{item.name}</h3>
                    <p className="menu-category">{item.category}</p>
                    <div className="menu-price">₹{item.price}</div>
                  </div>
                  <div className="menu-actions">
                    <div className="stock-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={item.inStock}
                          onChange={() => toggleStock(item.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <button className="edit-button" onClick={() => handleEditMenuItem(item)}>
                      <Edit3 size={16} />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Offers & Promotions</h2>
              <button className="add-button" onClick={handleAddOffer}>
                <Plus size={16} />
                Add New Offer
              </button>
            </div>
            
            <div className="offers-grid">
              {offers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-header">
                    <h3 className="offer-title">{offer.title}</h3>
                    <span className={`offer-status ${offer.isActive ? 'active' : 'inactive'}`}>
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="offer-description">{offer.description}</p>
                  <div className="offer-details">
                    <div className="offer-dish">{offer.dishName}</div>
                    <div className="offer-pricing">
                      <span className="original-price">₹{offer.originalPrice}</span>
                      <span className="discounted-price">₹{offer.discountedPrice}</span>
                    </div>
                  </div>
                  <div className="offer-validity">Valid until: {offer.validUntil}</div>
                  <div className="offer-actions">
                    <div className="offer-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={offer.isActive}
                          onChange={() => toggleOffer(offer.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <button className="edit-button" onClick={() => handleEditOffer(offer)}>
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteOffer(offer.id)}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <MenuDialog
        isOpen={menuDialogOpen}
        onClose={() => setMenuDialogOpen(false)}
        onSave={handleSaveMenuItem}
        item={selectedMenuItem}
        mode={dialogMode}
      />

      <OfferDialog
        isOpen={offerDialogOpen}
        onClose={() => setOfferDialogOpen(false)}
        onSave={handleSaveOffer}
        offer={selectedOffer}
        mode={dialogMode}
      />
    </div>
  );
};

export default Menu;