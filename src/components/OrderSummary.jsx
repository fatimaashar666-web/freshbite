import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Truck, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  X, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { FREE_DELIVERY_THRESHOLD } from '../data/foodItems';
import './OrderSummary.css';

const OrderSummary = ({ 
  showItems = false, 
  showPayment = false, 
  paymentMethod = 'cod', 
  setPaymentMethod,
  onCheckout, 
  isCheckoutLoading = false,
  checkoutButtonText = "Proceed to Checkout",
  address = null
}) => {
  const { 
    cartItems, 
    subtotal, 
    deliveryFee, 
    promoDiscount, 
    finalTotal, 
    appliedPromo, 
    promoCode, 
    setPromoCode, 
    promoError, 
    applyPromo, 
    removePromo 
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  // Calculate free delivery progress
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      const ok = applyPromo(inputCode);
      if (ok) setInputCode('');
    }
  };

  return (
    <div className="order-summary-card card">
      <h3 className="summary-header-title">Order Summary</h3>

      {/* Free Delivery Tracker Bar */}
      <div className="free-shipping-tracker">
        {deliveryFee === 0 ? (
          <div className="tracker-text free">
            <Sparkles size={16} />
            <span><strong>Congratulations!</strong> You get FREE delivery!</span>
          </div>
        ) : (
          <div className="tracker-text">
            <Truck size={16} />
            <span>Add <strong>{formatPrice(amountToFreeDelivery)}</strong> more for <strong>FREE Delivery</strong></span>
          </div>
        )}
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${deliveryFee === 0 ? 100 : freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Mini Items List if enabled (e.g. in checkout) */}
      {showItems && cartItems.length > 0 && (
        <div className="summary-items-list">
          <div className="summary-items-header">
            <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <div className="summary-items-scroll">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item-row">
                <div className="summary-item-name-box">
                  <span className="summary-item-qty">{item.quantity}x</span>
                  <span className="summary-item-name">{item.name}</span>
                </div>
                <span className="summary-item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Address Preview (if provided) */}
      {address && address.streetAddress && (
        <div className="summary-address-preview">
          <div className="address-preview-header">
            <MapPin size={16} className="text-primary" />
            <span className="preview-label">Delivering To:</span>
          </div>
          <p className="preview-recipient"><strong>{address.fullName}</strong> ({address.phone})</p>
          <p className="preview-text">
            {address.streetAddress}
            {address.apartment ? `, ${address.apartment}` : ''}, {address.city} {address.postalCode}
          </p>
        </div>
      )}

      {/* Promo Code Input */}
      <div className="promo-section">
        {appliedPromo ? (
          <div className="applied-promo-pill">
            <div className="promo-info">
              <Tag size={16} className="promo-icon" />
              <div>
                <span className="promo-tag-name">{appliedPromo.code}</span>
                <span className="promo-desc">{appliedPromo.description}</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={removePromo} 
              className="remove-promo-btn"
              title="Remove promo"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="promo-form">
            <div className="promo-input-box">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Promo code (e.g. FRESH20)"
                className="promo-input"
              />
              <button type="submit" className="promo-apply-btn">
                Apply
              </button>
            </div>
            {promoError && <p className="promo-error">{promoError}</p>}
            <p className="promo-hint">Use code <strong>FRESH20</strong> for 20% off!</p>
          </form>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="pricing-rows">
        <div className="pricing-row">
          <span className="label">Subtotal</span>
          <span className="val">{formatPrice(subtotal)}</span>
        </div>

        {promoDiscount > 0 && (
          <div className="pricing-row discount">
            <span className="label">Coupon Discount ({appliedPromo?.code})</span>
            <span className="val">- {formatPrice(promoDiscount)}</span>
          </div>
        )}

        <div className="pricing-row">
          <span className="label">Delivery Fee</span>
          <span className={`val ${deliveryFee === 0 ? 'free-tag' : ''}`}>
            {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
          </span>
        </div>

        <div className="pricing-divider" />

        <div className="pricing-row total">
          <span className="total-label">Total Amount</span>
          <span className="total-val">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Payment Method Selector if on Checkout */}
      {showPayment && setPaymentMethod && (
        <div className="payment-method-block">
          <h4 className="payment-title">Payment Method</h4>
          <div className="payment-options">
            <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <div className="payment-option-content">
                <Banknote size={22} className="payment-icon" />
                <div className="payment-text">
                  <span className="payment-name">Cash on Delivery</span>
                  <span className="payment-sub">Pay in cash when order arrives</span>
                </div>
              </div>
            </label>

            <label className={`payment-option-card ${paymentMethod === 'online' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={() => setPaymentMethod('online')}
              />
              <div className="payment-option-content">
                <CreditCard size={22} className="payment-icon" />
                <div className="payment-text">
                  <span className="payment-name">Online Payment</span>
                  <span className="payment-sub">Debit / Credit Card / UPI (Instant)</span>
                </div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Action Button */}
      {onCheckout && (
        <button
          type="button"
          onClick={onCheckout}
          disabled={cartItems.length === 0 || isCheckoutLoading}
          className="btn btn-primary btn-block checkout-action-btn"
        >
          {isCheckoutLoading ? (
            <span className="spinner-inline">Processing Order...</span>
          ) : (
            <>
              <span>{checkoutButtonText}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      )}

      {/* Trust Badges */}
      <div className="trust-footer">
        <div className="trust-item">
          <ShieldCheck size={16} className="trust-icon" />
          <span>100% Safe & Secure Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
