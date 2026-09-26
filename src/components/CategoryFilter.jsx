import React from 'react';
import { 
  Utensils, 
  Beef, 
  Pizza, 
  Sandwich, 
  Salad, 
  Cake, 
  Coffee, 
  Sparkles 
} from 'lucide-react';
import { CATEGORIES } from '../data/foodItems';
import './CategoryFilter.css';

const ICON_MAP = {
  Utensils: Utensils,
  Beef: Beef,
  Pizza: Pizza,
  Sandwich: Sandwich,
  Salad: Salad,
  Cake: Cake,
  Coffee: Coffee,
  Sparkles: Sparkles
};

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-wrapper">
      <div className="category-pill-list" role="tablist" aria-label="Food Categories">
        {CATEGORIES.map(category => {
          const IconComponent = ICON_MAP[category.icon] || Utensils;
          const isActive = activeCategory.toLowerCase() === category.name.toLowerCase() || 
                           (activeCategory === 'all' && category.id === 'all');

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category.id === 'all' ? 'All' : category.name)}
            >
              <div className="category-icon-bubble">
                <IconComponent size={18} />
              </div>
              <span className="category-label">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
