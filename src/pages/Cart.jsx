import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItemCount } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart-card card">
            <div className="empty-cart-icon-wrapper">
              <ShoppingBag size={56} className="empty-cart-icon" />
            </div>
            <h2 className="empty-cart-title">Your Cart is Empty</h2>
            <p className="empty-cart-desc">
              Looks like you haven't added any mouthwatering treats to your cart yet. Explore our delicious gourmet menu!
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              <Utensils size={18} />
              <span>Explore Food Menu</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header Breadcrumbs */}
        <div className="cart-header-row">
          <div>
            <Link to="/menu" className="back-link">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <h1 className="cart-page-title">
              Your Food Cart <span className="cart-count-badge">({totalItemCount} items)</span>
            </h1>
          </div>

          <button 
            type="button" 
            onClick={clearCart}
            className="btn btn-sm btn-ghost clear-cart-btn"
          >
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        {/* 2 Columns: Items List on Left, Summary on Right */}
        <div className="cart-layout-grid">
          <div className="cart-items-column">
            <div className="cart-items-wrapper">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          <div className="cart-summary-column">
            <OrderSummary
              showItems={false}
              showPayment={false}
              onCheckout={handleProceedToCheckout}
              checkoutButtonText="Proceed to Checkout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
