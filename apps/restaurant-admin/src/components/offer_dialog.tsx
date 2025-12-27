import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './offer_dialog.css';

interface OfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (offer: any) => void;
  offer?: any;
  mode: 'add' | 'edit';
}

const OfferDialog: React.FC<OfferDialogProps> = ({ isOpen, onClose, onSave, offer, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dishName: '',
    originalPrice: '',
    discountedPrice: '',
    isActive: true,
    validUntil: ''
  });

  useEffect(() => {
    if (mode === 'edit' && offer) {
      setFormData({
        title: offer.title,
        description: offer.description,
        dishName: offer.dishName,
        originalPrice: offer.originalPrice.toString(),
        discountedPrice: offer.discountedPrice.toString(),
        isActive: offer.isActive,
        validUntil: offer.validUntil
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dishName: '',
        originalPrice: '',
        discountedPrice: '',
        isActive: true,
        validUntil: ''
      });
    }
  }, [mode, offer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...offer,
      title: formData.title,
      description: formData.description,
      dishName: formData.dishName,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: parseFloat(formData.discountedPrice),
      isActive: formData.isActive,
      validUntil: formData.validUntil
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="offer-dialog-overlay" onClick={onClose}>
      <div className="offer-dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="offer-dialog-header">
          <h2 className="offer-dialog-title">
            {mode === 'add' ? 'Add New Offer' : 'Edit Offer'}
          </h2>
          <button className="offer-dialog-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="offer-dialog-form">
          <div className="offer-form-group">
            <label className="offer-form-label">Offer Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="offer-form-input"
              placeholder="e.g., Flat 20% Off"
              required
            />
          </div>

          <div className="offer-form-group">
            <label className="offer-form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="offer-form-textarea"
              placeholder="Brief description of the offer"
              rows={3}
              required
            />
          </div>

          <div className="offer-form-group">
            <label className="offer-form-label">Applicable Dish/Category</label>
            <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              className="offer-form-input"
              placeholder="e.g., All Main Course or Butter Chicken"
              required
            />
          </div>

          <div className="offer-form-row">
            <div className="offer-form-group">
              <label className="offer-form-label">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="offer-form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="offer-form-group">
              <label className="offer-form-label">Discounted Price (₹)</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="offer-form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="offer-form-group">
            <label className="offer-form-label">Valid Until</label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleChange}
              className="offer-form-input"
              required
            />
          </div>

          <div className="offer-form-group">
            <label className="offer-form-checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="offer-form-checkbox"
              />
              <span>Active Offer</span>
            </label>
          </div>

          <div className="offer-dialog-actions">
            <button type="button" className="offer-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="offer-btn-save">
              {mode === 'add' ? 'Add Offer' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferDialog;