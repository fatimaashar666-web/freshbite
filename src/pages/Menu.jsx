import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Frown, Sparkles } from 'lucide-react';
import { FOOD_ITEMS } from '../data/foodItems';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import './Menu.css';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState('featured');

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParam]);

  // Handle category change
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchParams(prev => {
      const nextParams = new URLSearchParams(prev);
      if (category === 'All') {
        nextParams.delete('category');
      } else {
        nextParams.set('category', category);
      }
      return nextParams;
    });
  };

  // Handle search change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setSearchParams(prev => {
      const nextParams = new URLSearchParams(prev);
      if (term.trim()) {
        nextParams.set('search', term.trim());
      } else {
        nextParams.delete('search');
      }
      return nextParams;
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and Sort items
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter(item => {
      // Category filter
      const matchesCategory = 
        activeCategory === 'All' || 
        item.category.toLowerCase() === activeCategory.toLowerCase();

      // Search term filter
      const matchesSearch = 
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <div className="menu-page">
      <div className="container">
        {/* Page Banner */}
        <div className="menu-banner">
          <div className="menu-banner-content">
            <span className="section-tag">Chef Crafted Flavors</span>
            <h1 className="menu-title">Explore Our Delicious Menu</h1>
            <p className="menu-subtitle">
              Freshly grilled, authentically baked, and hand-tossed with the finest ingredients.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="menu-controls-section">
          {/* Category Filter Pills */}
          <CategoryFilter 
            activeCategory={activeCategory} 
            onSelectCategory={handleCategorySelect} 
          />

          {/* Search & Sort Row */}
          <div className="search-sort-bar">
            <div className="menu-search-wrapper">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={handleSearchChange} 
                placeholder="Search food by name, description, ingredients..."
              />
            </div>

            <div className="sort-wrapper">
              <div className="sort-select-box">
                <ArrowUpDown size={16} className="sort-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                  aria-label="Sort dishes"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="rating">Top Rated (★)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Results Info */}
        <div className="filter-status-row">
          <p className="results-count">
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'} 
            {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
            {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
          </p>

          {(activeCategory !== 'All' || searchTerm) && (
            <button 
              type="button" 
              onClick={handleResetFilters}
              className="btn btn-sm btn-ghost reset-btn"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-food-grid">
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="no-results-state card">
            <div className="no-results-icon">
              <Frown size={48} />
            </div>
            <h3 className="no-results-title">No Dishes Found</h3>
            <p className="no-results-desc">
              We couldn't find any dishes matching your criteria. Try adjusting your search term or select another category.
            </p>
            <button 
              type="button" 
              onClick={handleResetFilters}
              className="btn btn-primary"
            >
              View All Dishes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
