import React, { useState } from 'react'
import { useTheme } from "../context/ThemeContext";
import SearchArea from "../components/SearchArea";
import CategoryFilter from "../components/CategoryFilter";
import { searchFilter } from "../utils/searchUtils";
import { IoMdAdd } from "react-icons/io";

const Menu = () => {
  const { themeClasses } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample menu items for demonstration
  const allMenuItems = [
    { id: 1, name: "Klasik Burger", category: "Ana Yemekler", price: "12.99₺", description: "Sulu et köftesi ve taze marul", image: "🍔" },
    { id: 2, name: "Margherita Pizza", category: "Ana Yemekler", price: "15.99₺", description: "Taze mozzarella ve fesleğen", image: "🍕" },
    { id: 3, name: "Sezar Salatası", category: "Sağlıklı", price: "8.99₺", description: "Çıtır marul ve parmesan peyniri", image: "🥗" },
    { id: 4, name: "Kremalı Makarna", category: "Ana Yemekler", price: "13.99₺", description: "Alfredo sosu ve mantarlı", image: "🍝" },
    { id: 5, name: "Espresso Kahve", category: "İçecekler", price: "3.99₺", description: "Güçlü ve aromatik kahve", image: "☕" },
    { id: 6, name: "Böğürtlen Smoothie", category: "İçecekler", price: "5.99₺", description: "Karışık meyveli ve yoğurtlu", image: "🥤" },
    { id: 7, name: "Balık Taco", category: "Ana Yemekler", price: "11.99₺", description: "Izgara balık ve limonlu", image: "🌮" },
    { id: 8, name: "Yeşil Çay", category: "İçecekler", price: "2.99₺", description: "Organik yeşil çay", image: "🍵" },
    { id: 9, name: "Meyve Kasesi", category: "Sağlıklı", price: "6.99₺", description: "Taze mevsim meyveleri", image: "🥝" },
    { id: 10, name: "Çikolatalı Kek", category: "Tatlılar", price: "7.99₺", description: "Zengin çikolatalı katmanlı kek", image: "🍰" },
    { id: 11, name: "Türk Kahvesi", category: "İçecekler", price: "4.99₺", description: "Geleneksel Türk kahvesi", image: "☕" },
    { id: 12, name: "Köfte", category: "Ana Yemekler", price: "14.99₺", description: "Ev yapımı köfte", image: "🍖" },
  ];

  // Categories for filter
  const categories = [
    { id: "All", label: "Tümü", icon: "🍽️", activeColor: "bg-purple-500" },
    { id: "Ana Yemekler", label: "Ana Yemekler", icon: "🍔", activeColor: "bg-red-500" },
    { id: "İçecekler", label: "İçecekler", icon: "☕", activeColor: "bg-blue-500" },
    { id: "Sağlıklı", label: "Sağlıklı", icon: "🥗", activeColor: "bg-green-500" },
    { id: "Tatlılar", label: "Tatlılar", icon: "🍰", activeColor: "bg-pink-500" },
  ];

  // Filter menu items based on search query and selected category
  const filteredItems = allMenuItems.filter(item => {
    // Category filter
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    // Search filter with Turkish character support
    const matchesSearch = searchFilter([item], searchQuery, ['name', 'category', 'description']).length > 0;
    
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={`min-h-screen transition-colors ${themeClasses.bgSecondary}`}>
      {/* Mobile Header */}
      <div className={`sticky top-0 z-10 px-4 py-2 border-b transition-colors ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <h1 className={`text-xl font-bold text-center ${themeClasses.textPrimary}`}>Menü</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-1 pb-14">
        <SearchArea 
          onSearch={handleSearch}
          placeholder="Yemek ve içecek ara..."
        />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-2 md:p-3 rounded-xl border transition-all duration-200 active:scale-95 hover:scale-105 ${themeClasses.bgPrimary} ${themeClasses.border} shadow-sm hover:shadow-lg`}
              >
                {/* Mobile Layout - Horizontal */}
                <div className="md:hidden flex items-center space-x-2">
                  {/* Item Image/Emoji - Centered with title */}
                  <div className="text-xl flex-shrink-0 self-start">
                    {item.image}
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-medium text-sm leading-tight ${themeClasses.textPrimary}`}>
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1 ml-1 flex-shrink-0">
                        <span className="font-medium text-green-600 text-sm">
                          {item.price}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors active:scale-95 shadow-sm">
                          <IoMdAdd size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Vertical Card */}
                <div className="hidden md:block">
                  {/* Item Image/Emoji */}
                  <div className="text-center mb-2">
                    <div className="text-3xl">
                      {item.image}
                    </div>
                  </div>
                  
                  {/* Item Details */}
                  <div className="text-center">
                    <h3 className={`font-semibold text-sm mb-1 ${themeClasses.textPrimary} line-clamp-2`}>
                      {item.name}
                    </h3>
                    
                    <p className={`text-xs mb-2 ${themeClasses.textSecondary} leading-relaxed line-clamp-2`}>
                      {item.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded-full text-xs font-medium ${themeClasses.bgTertiary} ${themeClasses.textTertiary} truncate max-w-16`}>
                        {item.category}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-green-600 text-sm">
                          {item.price}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition-colors active:scale-95 shadow-sm">
                          <IoMdAdd size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
              <div className="text-3xl mb-3">🔍</div>
              <p className="text-base mb-2">Sonuç bulunamadı</p>
              <p className="text-sm">
                {searchQuery ? `Başka bir arama terimi deneyin` : `${selectedCategory} kategorisinde ürün yok`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
