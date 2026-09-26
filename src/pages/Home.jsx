import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Award, 
  Truck, 
  Star, 
  Flame, 
  Heart,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { FOOD_ITEMS, CATEGORIES } from '../data/foodItems';
import FoodCard from '../components/FoodCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/menu?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  // Filter popular and recommended foods
  const popularItems = FOOD_ITEMS.filter(item => item.isPopular).slice(0, 4);
  const recommendedItems = FOOD_ITEMS.filter(item => item.isRecommended).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge animate-fadeIn">
              <Sparkles size={16} className="text-accent" />
              <span>Fastest Food Delivery In Town</span>
            </div>

            <h1 className="hero-title">
              Craving Delicious Food? <br />
              <span className="gradient-text">Delivered Fast & Fresh</span> To Your Door!
            </h1>

            <p className="hero-subtitle">
              Choose from mouthwatering gourmet burgers, artisan stone-baked pizzas, healthy superfood bowls, and sweet treats. Prepared with pure passion and delivered piping hot in under 30 minutes.
            </p>

            {/* Quick Hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hero-search-box">
              <div className="hero-search-input-wrapper">
                <Search size={22} className="hero-search-icon" />
                <input
                  type="text"
                  placeholder="What are you craving today? (e.g. Truffle Burger, Pizza...)"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="hero-search-input"
                />
              </div>
              <button type="submit" className="btn btn-primary hero-search-btn">
                Find Food
              </button>
            </form>

            {/* Stats / Trust Badges */}
            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="stat-number">30<small>min</small></span>
                <span className="stat-label">Fast Express Delivery</span>
              </div>
              <div className="stat-separator" />
              <div className="hero-stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Daily Happy Foodies</span>
              </div>
              <div className="stat-separator" />
              <div className="hero-stat-item">
                <span className="stat-number">4.9 ★</span>
                <span className="stat-label">Customer Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                alt="Delicious Gourmet Food Feast" 
                className="hero-main-img" 
              />
              
              {/* Floating Cards */}
              <div className="floating-card delivery-time-card">
                <div className="floating-icon-box green">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="floating-title">Express Delivery</span>
                  <span className="floating-subtitle">25-35 Minutes</span>
                </div>
              </div>

              <div className="floating-card promo-bubble-card">
                <div className="floating-icon-box blue">
                  <Flame size={20} />
                </div>
                <div>
                  <span className="floating-title">Special 20% OFF</span>
                  <span className="floating-subtitle">Code: <strong>FRESH20</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore By Category</span>
            <h2 className="section-title">What's on Your Mind?</h2>
            <p className="section-subtitle">
              Dive into our curated food categories and discover delicious handcrafted specialties.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.filter(cat => cat.id !== 'all').map(cat => (
              <Link 
                to={`/menu?category=${encodeURIComponent(cat.name)}`} 
                key={cat.id} 
                className="category-card"
              >
                <div className="category-card-circle">
                  {cat.name === 'Burgers' && '🍔'}
                  {cat.name === 'Pizza' && '🍕'}
                  {cat.name === 'Fast Food' && '🍟'}
                  {cat.name === 'Healthy Food' && '🥗'}
                  {cat.name === 'Desserts' && '🍰'}
                  {cat.name === 'Drinks' && '🥤'}
                </div>
                <h4 className="category-card-title">{cat.name}</h4>
                <span className="category-card-count">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROMOTIONAL BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card">
            <div className="promo-banner-content">
              <span className="promo-pill">Limited Time Weekend Offer</span>
              <h2 className="promo-heading">Get 20% OFF Your First Online Feast!</h2>
              <p className="promo-sub">
                Use code <span className="promo-code-highlight">FRESH20</span> at checkout. Plus, enjoy <strong>FREE Delivery</strong> on orders over Rs 1,500.
              </p>
              <div className="promo-actions">
                <Link to="/menu" className="btn btn-secondary btn-lg">
                  Order Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="promo-banner-graphic">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" 
                alt="Cheesy pizza slice" 
                className="promo-graphic-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR FOOD ITEMS */}
      <section className="food-list-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-tag">Customer Favorites</span>
              <h2 className="section-title">Most Popular Dishes</h2>
            </div>
            <Link to="/menu" className="btn btn-outline view-all-link">
              View All Menu <ChevronRight size={18} />
            </Link>
          </div>

          <div className="food-grid">
            {popularItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHEF RECOMMENDED ITEMS */}
      <section className="food-list-section bg-subtle">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-tag">Chef's Selection</span>
              <h2 className="section-title">Recommended Just For You</h2>
            </div>
            <Link to="/menu" className="btn btn-outline view-all-link">
              Explore Everything <ChevronRight size={18} />
            </Link>
          </div>

          <div className="food-grid">
            {recommendedItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why FreshBite</span>
            <h2 className="section-title">The Better Way to Order Food</h2>
            <p className="section-subtitle">
              We care about every single bite. From kitchen pan to your dining table, we keep the heat and taste intact.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-card card">
              <div className="why-icon-box">
                <Truck size={28} />
              </div>
              <h3 className="why-title">Super Fast Delivery</h3>
              <p className="why-desc">
                Our smart courier dispatch network guarantees food arrives fresh and steaming hot within 30 minutes.
              </p>
            </div>

            <div className="why-card card">
              <div className="why-icon-box green">
                <Award size={28} />
              </div>
              <h3 className="why-title">100% Quality Ingredients</h3>
              <p className="why-desc">
                We strictly partner with top artisanal suppliers for farm-fresh greens, prime cuts, and premium cheeses.
              </p>
            </div>

            <div className="why-card card">
              <div className="why-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3 className="why-title">Safe & Sealed Packaging</h3>
              <p className="why-desc">
                Eco-friendly, thermal tamper-evident insulated food containers to preserve flavor, crunch, and temperature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Real Food Lovers</span>
            <h2 className="section-title">Loved by Thousands of Foodies</h2>
            <p className="section-subtitle">
              See what our customers have to say about their delicious orders.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card card">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="testimonial-quote">
                "The Truffle Mushroom Swiss burger was insanely good! The fries arrived steaming crisp and not soggy at all. FreshBite is my new go-to!"
              </p>
              <div className="customer-info">
                <div className="customer-avatar">SJ</div>
                <div>
                  <h4 className="customer-name">Sarah Jenkins</h4>
                  <span className="customer-role">Verified Foodie</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card card">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="testimonial-quote">
                "Delivery was under 25 minutes on a Friday evening! Pepperoni Passion pizza had generous toppings and great crust. Loved the quick checkout."
              </p>
              <div className="customer-info">
                <div className="customer-avatar blue">MA</div>
                <div>
                  <h4 className="customer-name">Michael Adams</h4>
                  <span className="customer-role">Pizza Enthusiast</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card card">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="testimonial-quote">
                "As someone who eats clean, the Mediterranean Quinoa Bowl and Mango Smoothie were restaurant quality and ultra fresh. 10/10 recommend!"
              </p>
              <div className="customer-info">
                <div className="customer-avatar green">AP</div>
                <div>
                  <h4 className="customer-name">Ayesha Patel</h4>
                  <span className="customer-role">Health & Fitness Coach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to Treat Yourself?</h2>
            <p className="cta-subtitle">
              Browse our complete menu with over 18 handcrafted dishes. Hot, savory, and sweet flavors are just a click away!
            </p>
            <div className="cta-actions">
              <Link to="/menu" className="btn btn-secondary btn-lg">
                View Full Menu Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
