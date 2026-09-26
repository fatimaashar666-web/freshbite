import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  MapPin, 
  ShoppingBag, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import AddressForm from '../components/AddressForm';
import OrderSummary from '../components/OrderSummary';
import { generateOrderId } from '../utils/formatters';
import './Checkout.css';

const Checkout = () => {
  const { 
    cartItems, 
    subtotal, 
    deliveryFee, 
    promoDiscount, 
    finalTotal, 
    appliedPromo, 
    deliveryAddress, 
    saveDeliveryAddress, 
    setLastOrder, 
    clearCart,
    triggerToast
  } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'
  const [onlineCardDetails, setOnlineCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: '',
    expiryDate: '12/28',
    cvv: '•••'
  });
  const [isAddressSaved, setIsAddressSaved] = useState(
    Boolean(deliveryAddress.fullName && deliveryAddress.streetAddress && deliveryAddress.city)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Save address helper
  const handleAddressSave = (newAddress) => {
    saveDeliveryAddress(newAddress);
    setIsAddressSaved(true);
    setFormError('');
    triggerToast('Delivery address saved successfully!', 'success');
  };

  // Place Order handler
  const handlePlaceOrder = () => {
    // 1. Validate cart not empty
    if (cartItems.length === 0) {
      setFormError('Your cart is empty. Please add items before checking out.');
      return;
    }

    // 2. Validate address
    if (!deliveryAddress.fullName || !deliveryAddress.streetAddress || !deliveryAddress.city || !deliveryAddress.phone) {
      setFormError('Please fill and confirm your Delivery Address before placing the order.');
      // Scroll to address form
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    // Simulate order placement processing
    setTimeout(() => {
      const orderId = generateOrderId();
      const orderDate = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const orderData = {
        orderId,
        orderDate,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        promoDiscount,
        promoCode: appliedPromo?.code || null,
        finalTotal,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Prepaid)',
        deliveryAddress: { ...deliveryAddress },
        estimatedDelivery: '25 - 35 minutes',
        status: 'Order Placed'
      };

      // Set last order in context & storage
      setLastOrder(orderData);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti unavailable
      }

      // Clear the cart items
      clearCart();
      setIsSubmitting(false);

      // Navigate to order confirmation
      navigate('/order-success');
    }, 1200);
  };

  // Empty cart redirect guard
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart-card card">
            <div className="empty-cart-icon-wrapper">
              <ShoppingBag size={56} className="empty-cart-icon" />
            </div>
            <h2 className="empty-cart-title">Your Cart is Empty</h2>
            <p className="empty-cart-desc">
              You don't have any items in your cart to checkout.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore Food Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="checkout-header-row">
          <div>
            <Link to="/cart" className="back-link">
              <ArrowLeft size={16} /> Back to Cart
            </Link>
            <h1 className="checkout-page-title">Checkout & Delivery</h1>
            <p className="checkout-page-subtitle">
              Complete your address and confirm your payment method to receive your hot food!
            </p>
          </div>
        </div>

        {formError && (
          <div className="checkout-error-banner animate-fadeIn">
            <AlertTriangle size={20} className="error-icon" />
            <span>{formError}</span>
          </div>
        )}

        {/* 2 Column Layout */}
        <div className="checkout-layout-grid">
          {/* Left Column: Address Form & Payment Method Details */}
          <div className="checkout-main-column">
            {/* 1. Address Form Section */}
            <div className="checkout-step-block">
              <AddressForm
                initialAddress={deliveryAddress}
                onSaveAddress={handleAddressSave}
                isSaved={isAddressSaved}
                setIsSaved={setIsAddressSaved}
              />
            </div>

            {/* 2. Interactive Payment Options Card */}
            <div className="card payment-selection-card">
              <div className="payment-card-header">
                <div className="icon-badge">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h3 className="payment-card-title">Choose Payment Method</h3>
                  <p className="payment-card-subtitle">Select how you want to pay for this delivery</p>
                </div>
              </div>

              <div className="payment-options-grid">
                <div 
                  className={`payment-method-box ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="payment-radio-circle">
                    {paymentMethod === 'cod' && <div className="inner-dot" />}
                  </div>
                  <div className="payment-method-icon">
                    <Banknote size={26} />
                  </div>
                  <div className="payment-method-info">
                    <h4 className="method-name">Cash on Delivery (COD)</h4>
                    <p className="method-desc">Pay cash directly to the courier upon delivery at your doorstep.</p>
                  </div>
                  <span className="badge badge-green">Recommended</span>
                </div>

                <div 
                  className={`payment-method-box ${paymentMethod === 'online' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <div className="payment-radio-circle">
                    {paymentMethod === 'online' && <div className="inner-dot" />}
                  </div>
                  <div className="payment-method-icon">
                    <CreditCard size={26} />
                  </div>
                  <div className="payment-method-info">
                    <h4 className="method-name">Online Payment (Cards & Wallets)</h4>
                    <p className="method-desc">Pay safely with Visa, MasterCard, UnionPay, or Mobile Wallets.</p>
                  </div>
                  <span className="badge badge-blue">Instant</span>
                </div>
              </div>

              {/* Online payment simulated input fields */}
              {paymentMethod === 'online' && (
                <div className="online-payment-preview animate-fadeIn">
                  <div className="card-mockup">
                    <div className="card-chip" />
                    <div className="card-mock-number">4242  ••••  ••••  4242</div>
                    <div className="card-mock-footer">
                      <div>
                        <span className="mock-label">Card Holder</span>
                        <span className="mock-value">
                          {deliveryAddress.fullName ? deliveryAddress.fullName.toUpperCase() : 'YOUR NAME'}
                        </span>
                      </div>
                      <div>
                        <span className="mock-label">Expires</span>
                        <span className="mock-value">12 / 28</span>
                      </div>
                    </div>
                  </div>
                  <p className="mock-info-text">
                    🔒 Demo payment mode active. No actual charge will be made.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary with Items & Place Order CTA */}
          <div className="checkout-sidebar-column">
            <OrderSummary
              showItems={true}
              showPayment={false}
              address={deliveryAddress}
              onCheckout={handlePlaceOrder}
              isCheckoutLoading={isSubmitting}
              checkoutButtonText={`Place Order • ${paymentMethod === 'cod' ? 'Pay on Delivery' : 'Pay Online'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
