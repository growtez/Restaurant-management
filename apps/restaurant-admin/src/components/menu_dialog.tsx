import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './menu_dialog.css';

interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  item?: any;
  mode: 'add' | 'edit';
}

const MenuDialog: React.FC<MenuDialogProps> = ({ isOpen, onClose, onSave, item, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '🍽️',
    category: 'Starters',
    description:'',
    inStock: true
  });

  useEffect(() => {
    if (mode === 'edit' && item) {
      setFormData({
        name: item.name,
        price: item.price.toString(),
        image: item.image,
        category: item.category,
        description: item.description,
        inStock: item.inStock
      });
    } else {
      setFormData({
        name: '',
        price: '',
        image: '🍽️',
        category: 'Starters',
        description:'',
        inStock: true
      });
    }
  }, [mode, item, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      inStock: formData.inStock
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  const emojis = ['🍽️', '🍗', '🧀', '🥘', '🍚', '🍮', '🫓', '🍕', '🍔', '🍟', '🌮', '🍜', '🍱', '🥗', '🍖', '🥩'];

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">
            {mode === 'add' ? 'Add New Menu Item' : 'Edit Menu Item'}
          </h2>
          <button className="dialog-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Starters">Starters</option>
              <option value="Main Course">Main Course</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Breads">Breads</option>
            </select>
          </div>

            <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="name"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter item description"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Icon</label>
            <div className="emoji-grid">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`emoji-button ${formData.image === emoji ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>In Stock</span>
            </label>
          </div>

          <div className="dialog-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {mode === 'add' ? 'Add Item' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuDialog;