import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Global Toast Renderer Component
const GlobalToast = () => {
  const { toast } = useCart();

  if (!toast.visible) return null;

  return (
    <div className={`toast-notification ${toast.type}`}>
      {toast.type === 'success' && <CheckCircle2 size={18} color="#84CC16" />}
      {toast.type === 'error' && <AlertCircle size={18} color="#EF4444" />}
      {toast.type === 'info' && <Info size={18} color="#93C5FD" />}
      <span>{toast.message}</span>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <GlobalToast />
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
