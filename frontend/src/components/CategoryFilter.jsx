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
            className={`group flex items-center space-x-2 px-3 py-2 h-10 rounded-xl transition-colors duration-200 whitespace-nowrap outline-none border-2 ${
              selectedCategory === category.id
                ? `${category.activeColor || 'bg-blue-500'} text-white border-transparent`
                : `${themeClasses.bgPrimary} hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent ${themeClasses.border}`
            }`}
            style={{ boxShadow: 'none' }}
          >
            {/* Icon */}
            <div className={`text-lg transition-colors duration-200 ${
              selectedCategory === category.id 
                ? 'text-white' 
                : `text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white`
            }`}>
              {category.icon}
            </div>
            
            {/* Label */}
            <span className={`text-sm font-medium transition-colors duration-200 ${
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
