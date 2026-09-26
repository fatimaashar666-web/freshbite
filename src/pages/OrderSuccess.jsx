import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck, 
  Phone, 
  ShoppingBag, 
  Printer, 
  ArrowRight, 
  ChefHat, 
  Check, 
  PackageCheck,
  CreditCard,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { lastOrder } = useCart();
  const navigate = useNavigate();

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // Print receipt function
  const handlePrint = () => {
    window.print();
  };

  // If no last order exists in context or storage, provide fallback preview
  const order = lastOrder || {
    orderId: 'FB-98421',
    orderDate: new Date().toLocaleString(),
    items: [
      { id: 1, name: 'Classic Cheeseburger', price: 550, quantity: 2 },
      { id: 9, name: 'Cheesy Loaded Truffle Fries', price: 420, quantity: 1 }
    ],
    subtotal: 1520,
    deliveryFee: 0,
    promoDiscount: 0,
    finalTotal: 1520,
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: {
      fullName: 'Demo Customer',
      phone: '+1 555-0199',
      streetAddress: '42 Baker Street',
      apartment: 'Apt 2B',
      city: 'Downtown',
      postalCode: '10001',
      instructions: 'Please knock gently upon arrival.'
    },
    estimatedDelivery: '25 - 35 minutes'
  };

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-wrapper">
          {/* Header Card */}
          <div className="success-header-card card">
            <div className="success-icon-bubble">
              <CheckCircle2 size={54} className="success-check-icon" />
            </div>
            <span className="success-subtag">Order Placed Successfully!</span>
            <h1 className="success-title">Thank You For Your Order!</h1>
            <p className="success-desc">
              Your gourmet meal has been sent to our kitchen. Our master chefs are firing up the stoves right now!
            </p>

            <div className="order-meta-pill">
              <div className="order-meta-item">
                <span className="meta-label">Order Number</span>
                <span className="meta-value order-id">{order.orderId}</span>
              </div>
              <div className="meta-divider" />
              <div className="order-meta-item">
                <span className="meta-label">Estimated Delivery</span>
                <span className="meta-value text-fresh">{order.estimatedDelivery}</span>
              </div>
              <div className="meta-divider" />
              <div className="order-meta-item">
                <span className="meta-label">Payment Method</span>
                <span className="meta-value">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Order Tracking Timeline */}
          <div className="tracking-timeline-card card">
            <h3 className="card-section-title">Live Order Status</h3>
            <div className="timeline-tracker">
              {/* Step 1 */}
              <div className="timeline-step completed">
                <div className="step-circle">
                  <Check size={18} />
                </div>
                <div className="step-info">
                  <span className="step-name">Order Confirmed</span>
                  <span className="step-time">Just now</span>
                </div>
              </div>

              <div className="timeline-line active" />

              {/* Step 2 */}
              <div className="timeline-step active">
                <div className="step-circle pulse">
                  <ChefHat size={18} />
                </div>
                <div className="step-info">
                  <span className="step-name">In The Kitchen</span>
                  <span className="step-time">Preparing fresh</span>
                </div>
              </div>

              <div className="timeline-line" />

              {/* Step 3 */}
              <div className="timeline-step">
                <div className="step-circle">
                  <Truck size={18} />
                </div>
                <div className="step-info">
                  <span className="step-name">Out for Delivery</span>
                  <span className="step-time">Courier dispatching</span>
                </div>
              </div>

              <div className="timeline-line" />

              {/* Step 4 */}
              <div className="timeline-step">
                <div className="step-circle">
                  <PackageCheck size={18} />
                </div>
                <div className="step-info">
                  <span className="step-name">Delivered</span>
                  <span className="step-time">Enjoy your feast!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="order-details-grid">
            {/* Left Box: Items Ordered */}
            <div className="ordered-items-card card">
              <h3 className="card-section-title">Order Summary</h3>
              <div className="ordered-items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="ordered-item-row">
                    <div className="item-title-box">
                      <span className="item-qty-badge">{item.quantity}x</span>
                      <div>
                        <h4 className="item-name">{item.name}</h4>
                        <span className="item-unit-cost">{formatPrice(item.price)} each</span>
                      </div>
                    </div>
                    <span className="item-total-cost">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-calculation-rows">
                <div className="receipt-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                {order.promoDiscount > 0 && (
                  <div className="receipt-row discount">
                    <span>Discount ({order.promoCode || 'Promo'})</span>
                    <span>- {formatPrice(order.promoDiscount)}</span>
                  </div>
                )}
                <div className="receipt-row">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="receipt-divider" />
                <div className="receipt-row total">
                  <span>Total Paid</span>
                  <span className="receipt-total-val">{formatPrice(order.finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Right Box: Delivery Address & Contact */}
            <div className="delivery-info-card card">
              <h3 className="card-section-title">Delivery Address</h3>
              
              <div className="address-display-box">
                <div className="address-display-header">
                  <MapPin size={20} className="text-primary" />
                  <span className="recipient-name">{order.deliveryAddress.fullName}</span>
                </div>
                <p className="address-full-line">
                  {order.deliveryAddress.streetAddress}
                  {order.deliveryAddress.apartment ? `, ${order.deliveryAddress.apartment}` : ''}
                </p>
                <p className="address-city-line">
                  {order.deliveryAddress.city}, {order.deliveryAddress.postalCode}
                </p>

                <div className="address-phone-row">
                  <Phone size={15} />
                  <span>{order.deliveryAddress.phone}</span>
                </div>

                {order.deliveryAddress.instructions && (
                  <div className="instructions-callout">
                    <strong>Note:</strong> {order.deliveryAddress.instructions}
                  </div>
                )}
              </div>

              <div className="helpline-box">
                <span className="helpline-title">Need help with your order?</span>
                <p className="helpline-sub">Our 24/7 delivery support team is ready to assist you.</p>
                <a href="tel:080037374" className="btn btn-sm btn-outline helpline-call-btn">
                  <Phone size={14} /> Call Support: 0800-FRESH
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="success-page-actions">
            <button 
              type="button" 
              onClick={handlePrint}
              className="btn btn-outline"
            >
              <Printer size={18} /> Print Receipt
            </button>

            <Link to="/menu" className="btn btn-primary btn-lg">
              Order More Food <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
