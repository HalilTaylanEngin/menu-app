import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSearch, FiX } from "react-icons/fi";

const SearchArea = ({ onSearch, placeholder = "Ara..." }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { themeClasses } = useTheme();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="mb-2">
      <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 ${
        isFocused 
          ? 'border-blue-500 shadow-lg' 
          : themeClasses.border
      } ${themeClasses.bgPrimary}`}>
        <FiSearch className={`absolute left-3 w-4 h-4 transition-colors ${
          isFocused ? 'text-blue-500' : themeClasses.textTertiary
        }`} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 rounded-xl bg-transparent border-none outline-none text-sm transition-colors ${themeClasses.textPrimary} placeholder:${themeClasses.textTertiary}`}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={`absolute right-3 p-1 rounded-full transition-all duration-200 active:scale-90 ${themeClasses.textTertiary} hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {searchQuery && (
        <div className={`mt-2 px-1 ${themeClasses.textSecondary}`}>
          <p className="text-sm">
            {searchQuery.length > 0 && (
              <>
                Sonuçlar: <span className="font-medium text-blue-600">"{searchQuery}"</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchArea;
