import React from 'react';
import { Award } from 'lucide-react';
import { NavLink } from "react-router-dom";
import './offers.css';

const OffersPage = () => {
  const userStats = {
    loyaltyPoints: 1250,
    membershipTier: 'Gold'
  };

  const activeOffers = [
    { title: '20% Off Next Order', code: 'SAVE20', expires: '2024-12-31' },
    { title: 'Free Delivery', code: 'FREEDEL', expires: '2024-12-25' },
    { title: '$5 Off $30+', code: 'SAVE5', expires: '2025-01-15' }
  ];

  return (
    <div className="offers-container">
      {/* Header */}
      <header className="offers-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Offers & Rewards</h1>
      </header>

      {/* Loyalty Card */}
      <div className="loyalty-card">
        <div className="loyalty-header">
          <Award size={24} color="#d9b550" />
          <div>
            <h4>{userStats.membershipTier} Member</h4>
            <p>Keep earning points!</p>
          </div>
        </div>
        <div className="points-display">
          <span className="points-number">{userStats.loyaltyPoints}</span>
          <span className="points-label">Points Available</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
        <p className="progress-text">250 points until Platinum status</p>
      </div>

      {/* Offers Section */}
      <div className="offers-section">
        <h4>Active Offers</h4>
        <div className="offers-list">
          {activeOffers.map((offer, index) => (
            <div key={index} className="offer-card">
              <div className="offer-info">
                <h5>{offer.title}</h5>
                <p>Code: {offer.code}</p>
                <span className="expire-date">Expires {offer.expires}</span>
              </div>
              <button className="use-offer-btn">Use Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;