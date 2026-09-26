import React, { createContext, useContext, useState, useEffect } from 'react';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, PROMO_CODES } from '../data/foodItems';

const CartContext = createContext();

const CART_STORAGE_KEY = 'freshbite_cart_items';
const ADDRESS_STORAGE_KEY = 'freshbite_delivery_address';
const LAST_ORDER_KEY = 'freshbite_last_order';

export const CartProvider = ({ children }) => {
  // 1. Cart Items with LocalStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  });

  // 2. Saved Delivery Address with LocalStorage persistence
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    try {
      const saved = localStorage.getItem(ADDRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        fullName: '',
        phone: '',
        streetAddress: '',
        apartment: '',
        city: '',
        postalCode: '',
        instructions: ''
      };
    } catch (e) {
      return {
        fullName: '',
        phone: '',
        streetAddress: '',
        apartment: '',
        city: '',
        postalCode: '',
        instructions: ''
      };
    }
  });

  // 3. Last placed order persistence
  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // 4. Promo Code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // 5. Toast notification state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  // Save cart to LocalStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to persist cart items', e);
    }
  }, [cartItems]);

  // Save address to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(deliveryAddress));
    } catch (e) {
      console.error('Failed to persist address', e);
    }
  }, [deliveryAddress]);

  // Save last order to LocalStorage
  useEffect(() => {
    if (lastOrder) {
      try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(lastOrder));
      } catch (e) {
        console.error('Failed to persist last order', e);
      }
    }
  }, [lastOrder]);

  // Trigger toast notification
  const triggerToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Add Item to Cart (or increment if already in cart)
  const addToCart = (foodItem, quantityToAdd = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === foodItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: foodItem.id,
            name: foodItem.name,
            price: foodItem.price,
            image: foodItem.image,
            category: foodItem.category,
            quantity: quantityToAdd
          }
        ];
      }
    });
    triggerToast(`Added ${foodItem.name} to cart!`, 'success');
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    if (itemToRemove) {
      triggerToast(`Removed ${itemToRemove.name} from cart`, 'info');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  // Save Delivery Address
  const saveDeliveryAddress = (newAddress) => {
    setDeliveryAddress(newAddress);
  };

  // Apply Promo Code
  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a promo code');
      return false;
    }
    const promo = PROMO_CODES[cleanCode];
    if (!promo) {
      setPromoError('Invalid promo code. Try "FRESH20" or "FREEDEL"');
      return false;
    }
    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      setPromoError(`Minimum order amount of Rs ${promo.minSubtotal} required for this coupon`);
      return false;
    }
    setAppliedPromo({ code: cleanCode, ...promo });
    setPromoError('');
    triggerToast(`Promo code "${cleanCode}" applied successfully!`, 'success');
    return true;
  };

  // Remove Promo Code
  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    triggerToast('Promo code removed', 'info');
  };

  // Computations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  if (subtotal >= FREE_DELIVERY_THRESHOLD || (appliedPromo && appliedPromo.freeDelivery)) {
    deliveryFee = 0;
  }

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      promoDiscount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.discountAmount) {
      promoDiscount = Math.min(subtotal, appliedPromo.discountAmount);
    }
  }

  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  // Check if item is already in cart & its quantity
  const getItemQuantity = (id) => {
    const found = cartItems.find(item => item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        deliveryFee,
        promoDiscount,
        finalTotal,
        appliedPromo,
        promoCode,
        setPromoCode,
        promoError,
        applyPromo,
        removePromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        deliveryAddress,
        saveDeliveryAddress,
        lastOrder,
        setLastOrder,
        toast,
        triggerToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
