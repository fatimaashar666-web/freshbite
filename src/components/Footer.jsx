import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart,
  Instagram, 
  Facebook, 
  Twitter, 
  Send 
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to FreshBite updates and secret discount codes!');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Top Brand Banner / Features Banner */}
        <div className="footer-features-banner">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <div>
              <h4 className="feature-heading">Fast Delivery</h4>
              <p className="feature-desc">Delivered hot in 30 minutes</p>
            </div>
          </div>
          <div className="feature-divider" />
          <div className="feature-item">
            <span className="feature-icon">🥗</span>
            <div>
              <h4 className="feature-heading">100% Fresh Ingredients</h4>
              <p className="feature-desc">Chef-prepared gourmet quality</p>
            </div>
          </div>
          <div className="feature-divider" />
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <div>
              <h4 className="feature-heading">Contactless Safe Delivery</h4>
              <p className="feature-desc">Hygiene & safety first</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="footer-logo-icon">
                <UtensilsCrossed size={22} />
              </div>
              <span className="footer-brand-name">Fresh<span>Bite</span></span>
            </Link>
            <p className="footer-about">
              Experience handcrafted flavor delivered straight from our kitchen to your doorstep. Fresh, piping hot, and full of natural goodness.
            </p>
            <div className="social-links">
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Explore Menu</Link></li>
              <li><Link to="/menu?category=Burgers">Gourmet Burgers</Link></li>
              <li><Link to="/menu?category=Pizza">Artisan Pizzas</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </div>

          {/* Col 3: Delivery Hours & Location */}
          <div className="footer-col">
            <h4 className="footer-title">Operating Hours</h4>
            <div className="hours-block">
              <div className="hours-row">
                <Clock size={16} className="text-accent" />
                <div>
                  <strong>Mon - Thu:</strong> 10:00 AM – 11:30 PM
                </div>
              </div>
              <div className="hours-row">
                <Clock size={16} className="text-accent" />
                <div>
                  <strong>Fri - Sun:</strong> 10:00 AM – 01:00 AM
                </div>
              </div>
            </div>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <MapPin size={16} className="text-accent" />
                <span>45 Avenue Boulevard, Downtown Food Park</span>
              </div>
              <div className="contact-info-item">
                <Phone size={16} className="text-accent" />
                <span>+1 (800) 456-7890</span>
              </div>
              <div className="contact-info-item">
                <Mail size={16} className="text-accent" />
                <span>hello@freshbite.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="footer-col">
            <h4 className="footer-title">Get 20% Off Your Order</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for exclusive weekly discounts and fresh menu additions.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-box">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  required 
                  className="newsletter-input" 
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <Send size={16} />
                </button>
              </div>
            </form>
            <div className="coupon-hint">
              Use code <span className="highlight-tag">FRESH20</span> at checkout today!
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} FreshBite Delivery Inc. All rights reserved. Crafted with <Heart size={14} className="heart-icon" /> for foodies.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#support">Help & Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
