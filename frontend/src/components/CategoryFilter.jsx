import React from "react";
import { useTheme } from "../context/ThemeContext";

const CategoryFilter = ({ categories, onCategoryChange, selectedCategory = "All" }) => {
  const { themeClasses } = useTheme();

  const handleCategoryClick = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="mb-2">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap focus:outline-none ${
              selectedCategory === category.id
                ? `${category.activeColor || 'bg-blue-500'} text-white shadow-lg`
                : `${themeClasses.bgPrimary} hover:shadow-md`
            }`}
          >
            {/* Icon */}
            <div className="text-lg transition-transform duration-200">
              {category.icon}
            </div>
            
            {/* Label */}
            <span className={`text-sm font-medium ${
              selectedCategory === category.id 
                ? 'text-white' 
                : themeClasses.textPrimary
            }`}>
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
