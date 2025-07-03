import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from "../context/ThemeContext";
import SearchArea from "../components/SearchArea";
import CategoryFilter from "../components/CategoryFilter";
import MenuItemDetail from "../components/MenuItemDetail";
import MenuItemImage from "../components/MenuItemImage";
import { searchFilter } from "../utils/searchUtils";
import { IoMdAdd } from "react-icons/io";
import { 
  FiGrid, 
  FiCoffee, 
  FiHeart, 
  FiStar,
  FiPackage
} from "react-icons/fi";
import { 
  MdRestaurant,
  MdLocalDining 
} from "react-icons/md";
import { selectActiveMenuItems, selectMenuCategories } from '../store/menuSlice';

const Menu = () => {
  const { themeClasses } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get active menu items from Redux
  const allMenuItems = useSelector(selectActiveMenuItems);
  
  // İlk 6 resmi priority loading ile hemen yükle
  const priorityCount = 6;

  // Get categories from Redux and add extra properties for UI
  const reduxCategories = useSelector(selectMenuCategories);
  const categories = reduxCategories.map(cat => {
    const uiProps = {
      "All": { icon: <FiGrid className="w-4 h-4" />, activeColor: "bg-purple-500" },
      "Ana Yemekler": { icon: <MdRestaurant className="w-4 h-4" />, activeColor: "bg-red-500" },
      "İçecekler": { icon: <FiCoffee className="w-4 h-4" />, activeColor: "bg-blue-500" },
      "Sağlıklı": { icon: <FiHeart className="w-4 h-4" />, activeColor: "bg-green-500" },
      "Tatlılar": { icon: <FiStar className="w-4 h-4" />, activeColor: "bg-pink-500" },
    };
    return { ...cat, ...uiProps[cat.id] };
  });

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (orderItem) => {
    // Here you would typically add the item to cart state or context
    // For now, just show an alert
    alert(`${orderItem.name} sepete eklendi!`);
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
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-2 md:p-3 rounded-xl border transition-all duration-200 active:scale-95 hover:scale-105 cursor-pointer ${themeClasses.bgPrimary} ${themeClasses.border} shadow-sm hover:shadow-lg`}
                onClick={() => handleItemClick(item)}
              >
                {/* Mobile Layout - Horizontal */}
                <div className="md:hidden flex items-center space-x-2">
                  {/* Item Image */}
                  <div className="flex-shrink-0 self-start">
                    <MenuItemImage 
                      src={item.image} 
                      alt={item.name} 
                      size="medium"
                      priority={index < priorityCount}
                      lazy={index >= priorityCount}
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-medium text-sm leading-tight ${themeClasses.textPrimary}`}>
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1 ml-1 flex-shrink-0">
                        <span className="font-medium text-green-600 text-sm">
                          {item.price}₺
                        </span>
                        <button 
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors active:scale-95 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(item);
                          }}
                        >
                          <IoMdAdd size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Vertical Card */}
                <div className="hidden md:block">
                  {/* Item Image */}
                  <div className="flex justify-center mb-2">
                    <MenuItemImage 
                      src={item.image} 
                      alt={item.name} 
                      size="large"
                      priority={index < priorityCount}
                      lazy={index >= priorityCount}
                    />
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
                          {item.price}₺
                        </span>
                        <button 
                          className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition-colors active:scale-95 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(item);
                          }}
                        >
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

      {/* Menu Item Detail Modal */}
      <MenuItemDetail
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default Menu
