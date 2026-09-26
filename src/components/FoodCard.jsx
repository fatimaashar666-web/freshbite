import React from 'react';
import { Star, Plus, Minus, Clock, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import './FoodCard.css';

const FoodCard = ({ item }) => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="food-card">
      {/* Food Image Container */}
      <div className="food-image-wrapper">
        <img 
          src={item.image} 
          alt={item.name} 
          className="food-image" 
          loading="lazy"
          onError={(e) => {
            // fallback image if offline or broken link
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
          }}
        />
        
        {/* Badges Overlay */}
        <div className="food-badge-overlay">
          {item.badge && (
            <span className="food-badge badge-fresh">{item.badge}</span>
          )}
        </div>

        <div className="food-prep-pill">
          <Clock size={13} />
          <span>{item.prepTime || '15-20 min'}</span>
        </div>
      </div>

      {/* Food Card Body */}
      <div className="food-content">
        <div className="food-meta-row">
          <span className="food-category-pill">{item.category}</span>
          <div className="food-rating">
            <Star size={14} className="star-icon" />
            <span className="rating-val">{item.rating}</span>
            <span className="rating-count">({item.reviewsCount || 120})</span>
          </div>
        </div>

        <h3 className="food-title">{item.name}</h3>
        <p className="food-description">{item.description}</p>

        {/* Footer: Price and Add / Quantity Controller */}
        <div className="food-footer">
          <div className="price-tag">
            <span className="price-amount">{formatPrice(item.price)}</span>
          </div>

          <div className="card-actions">
            {quantity > 0 ? (
              <div className="quantity-controller">
                <button 
                  type="button" 
                  onClick={handleDecrement}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button 
                  type="button" 
                  onClick={handleIncrement}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            ) : (
              <button 
                type="button" 
                onClick={handleAdd}
                className="add-to-cart-btn"
                aria-label={`Add ${item.name} to cart`}
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
