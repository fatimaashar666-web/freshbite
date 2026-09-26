import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, UtensilsCrossed, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { totalItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="FreshBite Home">
          <div className="logo-icon-wrapper">
            <UtensilsCrossed className="logo-icon" size={24} />
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-name">Fresh<span className="brand-accent">Bite</span></span>
            <span className="brand-tagline">Fast & Hot Delivery</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Food Menu
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Cart
          </NavLink>
          <NavLink 
            to="/checkout" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Checkout
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <div className="hotline-pill d-none-mobile">
            <PhoneCall size={16} className="hotline-icon" />
            <span className="hotline-text">0800-FRESH</span>
          </div>

          {/* Cart Button */}
          <Link to="/cart" className="cart-badge-btn" aria-label={`Cart with ${totalItemCount} items`}>
            <div className="cart-icon-box">
              <ShoppingBag size={20} />
              {totalItemCount > 0 && (
                <span className="cart-count-bubble animate-bounce">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="cart-btn-label d-none-mobile">My Cart</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fadeIn">
          <div className="mobile-drawer-inner">
            <nav className="mobile-nav-links">
              <NavLink 
                to="/" 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/menu" 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                Food Menu
              </NavLink>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                Shopping Cart ({totalItemCount})
              </NavLink>
              <NavLink 
                to="/checkout" 
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                Checkout & Delivery
              </NavLink>
            </nav>

            <div className="mobile-drawer-footer">
              <div className="promo-badge-mobile">
                <Sparkles size={16} />
                <span>Use code <strong>FRESH20</strong> for 20% OFF!</span>
              </div>
              <Link to="/menu" className="btn btn-primary btn-block">
                Order Food Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
