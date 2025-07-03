import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSave, 
  FiX, 
  FiSearch,
  FiFilter,
  FiEye,
  FiEyeOff,
  FiImage,
  FiArrowLeft
} from "react-icons/fi";
import { 
  selectAllMenuItems, 
  selectMenuCategories, 
  selectMenuItemsCount,
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  toggleMenuItemActive 
} from '../store/menuSlice';
import ImageSelector from '../components/ImageSelector';
import MenuItemImage from '../components/MenuItemImage';

// ItemForm bileşenini component dışında tanımlayalım
const ItemForm = React.memo(React.forwardRef(({ item, onSave, onCancel, isEditing = false, onFieldChange, themeClasses, categories }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-xl border-2 shadow-lg ring-2 ring-blue-500/20 ${themeClasses.bgPrimary} ${themeClasses.border} mb-4`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
            Ürün Adı
          </label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => onFieldChange('name', e.target.value)}
            className={`w-full p-2 rounded-lg border ${themeClasses.bgSecondary} ${themeClasses.border} ${themeClasses.textPrimary}`}
            placeholder="Ürün adını girin..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
            Kategori
          </label>
          <select
            value={item.category || 'Ana Yemekler'}
            onChange={(e) => onFieldChange('category', e.target.value)}
            className={`w-full p-2 rounded-lg border ${themeClasses.bgSecondary} ${themeClasses.border} ${themeClasses.textPrimary}`}
          >
            {categories.filter(cat => cat.id !== 'All').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
            Fiyat (₺)
          </label>
          <input
            type="number"
            step="0.01"
            value={item.price || ''}
            onChange={(e) => onFieldChange('price', e.target.value)}
            className={`w-full p-2 rounded-lg border ${themeClasses.bgSecondary} ${themeClasses.border} ${themeClasses.textPrimary}`}
            placeholder="0.00"
          />
        </div>

        <div className="md:col-span-2">
          <ImageSelector
            currentImage={item.image}
            onImageSelect={(imageUrl) => onFieldChange('image', imageUrl)}
            themeClasses={themeClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
            Açıklama
          </label>
          <textarea
            value={item.description || ''}
            onChange={(e) => onFieldChange('description', e.target.value)}
            rows={3}
            className={`w-full p-2 rounded-lg border ${themeClasses.bgSecondary} ${themeClasses.border} ${themeClasses.textPrimary}`}
            placeholder="Ürün açıklamasını girin..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`}
        >
          <FiX className="w-4 h-4 mr-2 inline" />
          İptal
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          <FiSave className="w-4 h-4 mr-2 inline" />
          {isEditing ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </motion.div>
  );
}));

ItemForm.displayName = 'ItemForm';

const MenuManagement = () => {
  const { themeClasses } = useTheme();
  const dispatch = useDispatch();
  const menuItems = useSelector(selectAllMenuItems);
  const categories = useSelector(selectMenuCategories);
  const itemsCount = useSelector(selectMenuItemsCount);
  
  // Ref for scrolling to form
  const formRef = useRef(null);

  // State'leri localStorage ile senkronize et
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('menuManagement_searchTerm') || '';
  });
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('menuManagement_selectedCategory') || 'All';
  });
  // showInactive state'ini localStorage ile senkronize et
  const [showInactive, setShowInactive] = useState(() => {
    const savedPreference = localStorage.getItem('menuManagement_showInactive');
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Ana Yemekler',
    price: '',
    description: '',
    image: '/images/burger.jpg',
    isActive: true
  });

  // Filter items based on search and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesActiveStatus = showInactive || item.isActive;
    
    return matchesSearch && matchesCategory && matchesActiveStatus;
  });

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.price.trim()) {
      dispatch(addMenuItem(newItem));
      setNewItem({
        name: '',
        category: 'Ana Yemekler',
        price: '',
        description: '',
        image: '/images/burger.jpg',
        isActive: true
      });
      setShowAddForm(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  // Modal açılınca sayfayı yukarı scroll et
  useEffect(() => {
    if (editingItem || showAddForm) {
      // Önce sayfayı yukarı scroll et
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Sonra form'a scroll et (biraz gecikme ile)
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
          });
        }
      }, 300);
    }
  }, [editingItem, showAddForm]);

  const handleSaveEdit = () => {
    if (editingItem.name.trim() && editingItem.price.trim()) {
      dispatch(updateMenuItem(editingItem));
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      dispatch(deleteMenuItem(id));
    }
  };

  const handleToggleActive = (id) => {
    dispatch(toggleMenuItemActive(id));
  };

  // Form handlers for new item
  const handleNewItemChange = useCallback((field, value) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  }, []);

  // Form handlers for editing item
  const handleEditItemChange = useCallback((field, value) => {
    setEditingItem(prev => ({ ...prev, [field]: value }));
  }, []);

  // Cancel handlers
  const handleCancelAdd = useCallback(() => {
    setShowAddForm(false);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingItem(null);
  }, []);

  // showInactive tercihini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('menuManagement_showInactive', JSON.stringify(showInactive));
  }, [showInactive]);

  // searchTerm tercihini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('menuManagement_searchTerm', searchTerm);
  }, [searchTerm]);

  // selectedCategory tercihini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('menuManagement_selectedCategory', selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen transition-colors ${themeClasses.bgSecondary}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-3 sm:px-4 py-2 border-b transition-colors ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.history.back()}
              className={`p-2 rounded-lg ${themeClasses.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`text-xl font-bold ${themeClasses.textPrimary}`}>
              Menü Yönetimi
            </h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 pb-20">
        {/* Controls */}
        <div className="mb-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textSecondary}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ürün ara..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${themeClasses.bgPrimary} ${themeClasses.border} ${themeClasses.textPrimary}`}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center space-x-2">
              <FiFilter className={`${themeClasses.textSecondary}`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-1 rounded-lg border ${themeClasses.bgPrimary} ${themeClasses.border} ${themeClasses.textPrimary}`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowInactive(!showInactive)}
              className={`px-3 py-1 rounded-lg border ${themeClasses.border} ${
                showInactive 
                  ? 'bg-orange-500 text-white' 
                  : `${themeClasses.bgPrimary} ${themeClasses.textSecondary}`
              }`}
            >
              {showInactive ? <FiEye className="w-4 h-4 mr-1 inline" /> : <FiEyeOff className="w-4 h-4 mr-1 inline" />}
              {showInactive ? 'Pasif Göster' : 'Sadece Aktif'}
            </button>
          </div>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAddForm && (
            <ItemForm
              ref={formRef}
              item={newItem}
              onSave={handleAddItem}
              onCancel={handleCancelAdd}
              onFieldChange={handleNewItemChange}
              themeClasses={themeClasses}
              categories={categories}
            />
          )}
        </AnimatePresence>

        {/* Edit Form */}
        <AnimatePresence>
          {editingItem && (
            <ItemForm
              ref={formRef}
              item={editingItem}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isEditing={true}
              onFieldChange={handleEditItemChange}
              themeClasses={themeClasses}
              categories={categories}
            />
          )}
        </AnimatePresence>

        {/* Items List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
              Ürünler ({filteredItems.length})
            </h2>
            <div className={`text-sm ${themeClasses.textSecondary}`}>
              Toplam: {itemsCount.total} | Aktif: {itemsCount.active}
            </div>
          </div>

          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-3 sm:p-4 rounded-xl border ${themeClasses.bgPrimary} ${themeClasses.border} ${
                  !item.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <MenuItemImage 
                      src={item.image} 
                      alt={item.name} 
                      size="medium"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      {/* Başlık ve badge'ler - mobile'da alt alta */}
                      <div className="mb-1">
                        <h3 className={`font-semibold text-sm sm:text-base ${themeClasses.textPrimary} mb-1 truncate`}>
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${themeClasses.bgTertiary} ${themeClasses.textTertiary} whitespace-nowrap`}>
                            {item.category}
                          </span>
                          {!item.isActive && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 whitespace-nowrap">
                              Pasif
                            </span>
                          )}
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm ${themeClasses.textSecondary} mb-2 line-clamp-2`}>
                        {item.description}
                      </p>
                      <div className="text-base sm:text-lg font-bold text-green-600">
                        {item.price}₺
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 ml-1 sm:ml-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`p-1.5 sm:p-2 rounded-lg ${
                        item.isActive 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                      title={item.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                    >
                      {item.isActive ? <FiEye className="w-3 h-3 sm:w-4 sm:h-4" /> : <FiEyeOff className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                      title="Düzenle"
                    >
                      <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 sm:p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                      title="Sil"
                    >
                      <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
              <div className="text-3xl mb-3">📋</div>
              <p className="text-base mb-2">Ürün bulunamadı</p>
              <p className="text-sm">
                {searchTerm ? 'Farklı bir arama terimi deneyin' : 'Yeni ürün ekleyin'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
