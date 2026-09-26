import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item-card">
      <div className="cart-item-image-wrapper">
        <img 
          src={item.image} 
          alt={item.name} 
          className="cart-item-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80";
          }}
        />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-header">
          <div>
            <h4 className="cart-item-name">{item.name}</h4>
            <span className="cart-item-category">{item.category || 'Food'}</span>
          </div>
          <button 
            type="button" 
            onClick={() => onRemove(item.id)}
            className="cart-item-remove-btn"
            title="Remove item"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="cart-item-footer">
          <div className="cart-item-price-info">
            <span className="cart-item-unit-price">{formatPrice(item.price)} each</span>
            <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
          </div>

          <div className="cart-item-qty-ctrl">
            <button 
              type="button" 
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="cart-qty-btn"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="cart-qty-val">{item.quantity}</span>
            <button 
              type="button" 
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="cart-qty-btn"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
