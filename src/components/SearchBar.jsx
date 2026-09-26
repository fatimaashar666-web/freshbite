import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Search burgers, pizza, desserts...",
  onSubmit 
}) => {
  const handleClear = () => {
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(searchTerm);
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search food items"
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={handleClear} 
            className="search-clear-btn"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
