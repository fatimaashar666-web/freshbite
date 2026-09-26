# FreshBite — Modern Food Delivery Website

A responsive, high-performance food delivery web application built according to [`plan.md`](./plan.md) with **React**, **Vite**, **React Router**, and **Lucide React**, styled with a **Blue & Light Green** theme.

---

## 🎨 Color Palette

| Color | Hex Code | Usage |
|---|---|---|
| **Primary Blue** | `#2563EB` | Buttons, links, accents |
| **Dark Blue** | `#1E3A8A` | Headings, hero text, navigation, footer |
| **Light Green** | `#D9F99D` | Background accents, category highlights |
| **Fresh Green** | `#84CC16` | Badges, success messages, delivery trackers |
| **Light Background** | `#F8FAFC` | Page background |
| **White** | `#FFFFFF` | Cards, forms, modals |
| **Dark Text** | `#1F2937` | Body text |

---

## 🚀 Features

### 1. Home Page (`/`)
- **Hero Section**: Catchy headline, stats badges (30-min delivery, 500+ happy foodies, 4.9★ rating), search bar, and floating delivery indicator cards.
- **Category Explorer**: Direct navigation to categories (Burgers, Pizza, Fast Food, Healthy Food, Desserts, Drinks).
- **Promotional Deals**: Promotional banner with 20% OFF discount coupon code (`FRESH20`).
- **Customer Favorites & Recommended Dishes**: Add to cart directly from home.
- **Why Choose Us**: Feature highlights with 30-minute delivery promise, fresh ingredients, and tamper-evident packaging.
- **Foodie Testimonials**: 5-star customer reviews.
- **Footer**: Newsletter signup, business hours, Downtown Food Park address, and social links.

### 2. Food Menu (`/menu`)
- Interactive **Category Filters** (All, Burgers, Pizza, Fast Food, Healthy Food, Desserts, Drinks).
- Real-time **Search Bar** by food name, description, or ingredient.
- **Sorting**: Featured, Top Rated, Price: Low to High, Price: High to Low.
- Responsive food cards with image, badge ("Bestseller", "Chef Special"), rating, prep time, price, and dynamic cart quantity counter.

### 3. Shopping Cart (`/cart`)
- List of items with thumbnail, item name, unit price, quantity increment/decrement controls, item subtotal, and delete button.
- **Free Delivery Progress Tracker**: Live progress bar showing how much more to add for free delivery.
- **Promo Code Engine**: Test with `FRESH20` (20% off) or `FREEDEL` (free delivery).
- **LocalStorage Persistence**: Cart state remains saved even after page refresh.
- Clear cart functionality and empty cart state with "Explore Menu" call-to-action.

### 4. Checkout & Address (`/checkout`)
- **Delivery Address Form**:
  - Full Name, Phone Number, Street Address, Apartment / House #, City, Postal Code, and Delivery Instructions.
  - Live client-side validation for required fields and phone number format.
  - Address saved into `localStorage` for future visits.
- **Payment Method Selector**:
  - Cash on Delivery (COD)
  - Online Payment (with interactive mock card preview)
- **Place Order CTA**: Validates cart and address, simulates server processing with spinner, fires celebration confetti, and clears the cart.

### 5. Order Confirmation (`/order-success`)
- Generated unique order ID (e.g. `FB-K7P892`).
- **Live Order Tracking Timeline**: Order Placed ➔ In The Kitchen ➔ Out for Delivery ➔ Delivered.
- Detailed itemized receipt summary (subtotal, promo discount, delivery fee, total paid).
- Delivery address confirmation.
- **Print Receipt** button formatted for clean printing without navigation/footers.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite 6**
- **React Router DOM v6**
- **Lucide React** (icons)
- **Canvas-Confetti** (celebration effects)
- **Pure CSS3** (Custom properties & responsive Flexbox/Grid)

---

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```
