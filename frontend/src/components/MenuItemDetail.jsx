import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../context/ThemeContext";
import { IoMdClose, IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdTimer, MdLocalOffer } from "react-icons/md";
import MenuItemImage from "./MenuItemImage";

const MenuItemDetail = ({ item, isOpen, onClose, onAddToCart }) => {
  const { themeClasses } = useTheme();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState('normal');
  const [selectedExtras, setSelectedExtras] = React.useState([]);

  if (!item) return null;

  // Mock data for demonstration
  const itemDetails = {
    ...item,
    fullDescription: "Bu lezzetli yemek, özenle seçilmiş taze malzemeler ile hazırlanmıştır. Geleneksel tatları modern sunumla buluşturan bu nefis lezzet, damak tadınızı unutulmaz kılacak.",
    rating: 4.5,
    reviewCount: 127,
    prepTime: "15-20 dk",
    calories: 450,
    ingredients: ["Taze marul", "Domates", "Soğan", "Özel sos", "Peynir"],
    allergens: ["Gluten", "Süt ürünleri"],
    sizes: [
      { id: 'small', name: 'Küçük', price: parseFloat(item.price) - 2, description: 'Hafif atıştırmalık' },
      { id: 'normal', name: 'Normal', price: parseFloat(item.price), description: 'Standart porsiyon' },
      { id: 'large', name: 'Büyük', price: parseFloat(item.price) + 3, description: 'Tok tutucu porsiyon' }
    ],
    extras: [
      { id: 'extra-cheese', name: 'Ekstra Peynir', price: 2.5 },
      { id: 'extra-sauce', name: 'Ekstra Sos', price: 1.5 },
      { id: 'extra-meat', name: 'Ekstra Et', price: 4.0 },
      { id: 'extra-vegetables', name: 'Ekstra Sebze', price: 2.0 }
    ]
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleExtraToggle = (extraId) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotalPrice = () => {
    const selectedSizePrice = itemDetails.sizes.find(size => size.id === selectedSize)?.price || 0;
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = itemDetails.extras.find(e => e.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);
    return (selectedSizePrice + extrasPrice) * quantity;
  };

  const handleAddToCart = () => {
    const orderItem = {
      ...itemDetails,
      selectedSize,
      selectedExtras,
      quantity,
      totalPrice: calculateTotalPrice()
    };
    onAddToCart(orderItem);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl ${themeClasses.bgPrimary} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg`}
            >
              <IoMdClose size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] pb-24">
              {/* Header Section */}
              <div className="relative">
                {/* Hero Image - Full Width */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <MenuItemImage
                    src={itemDetails.image}
                    alt={itemDetails.name}
                    className="w-full h-full"
                    size="full"
                    priority={true}
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Title and Basic Info */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-1`}>
                        {itemDetails.name}
                      </h2>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(itemDetails.rating)}
                        </div>
                        <span className={`text-sm ${themeClasses.textSecondary}`}>
                          {itemDetails.rating} ({itemDetails.reviewCount} değerlendirme)
                        </span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${themeClasses.bgTertiary} ${themeClasses.textTertiary}`}>
                      {itemDetails.category}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <MdTimer className={`text-orange-500 ${themeClasses.textSecondary}`} />
                      <span className={`text-sm ${themeClasses.textSecondary}`}>
                        {itemDetails.prepTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MdLocalOffer className={`text-green-500 ${themeClasses.textSecondary}`} />
                      <span className={`text-sm ${themeClasses.textSecondary}`}>
                        {itemDetails.calories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-4 ${themeClasses.textSecondary}`}>
                    {itemDetails.fullDescription}
                  </p>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <h3 className={`text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
                      İçerik
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {itemDetails.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${themeClasses.bgTertiary} ${themeClasses.textTertiary}`}
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergens */}
                  {itemDetails.allergens.length > 0 && (
                    <div className="mb-6">
                      <h3 className={`text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
                        Alerjen Uyarısı
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {itemDetails.allergens.map((allergen, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className={`text-sm font-medium mb-3 ${themeClasses.textPrimary}`}>
                      Porsiyon Seçimi
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {itemDetails.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => handleSizeChange(size.id)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedSize === size.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : `border-gray-200 dark:border-gray-700 ${themeClasses.bgSecondary}`
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div className={`font-medium ${themeClasses.textPrimary}`}>
                                {size.name}
                              </div>
                              <div className={`text-xs ${themeClasses.textSecondary}`}>
                                {size.description}
                              </div>
                            </div>
                            <div className="font-bold text-green-600">
                              {size.price.toFixed(2)}₺
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extras */}
                  <div className="mb-6">
                    <h3 className={`text-sm font-medium mb-3 ${themeClasses.textPrimary}`}>
                      Ekstra Malzemeler
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {itemDetails.extras.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => handleExtraToggle(extra.id)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedExtras.includes(extra.id)
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : `border-gray-200 dark:border-gray-700 ${themeClasses.bgSecondary}`
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className={`font-medium ${themeClasses.textPrimary}`}>
                              {extra.name}
                            </div>
                            <div className="font-bold text-green-600">
                              +{extra.price.toFixed(2)}₺
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${themeClasses.bgPrimary} ${themeClasses.border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={`p-2 rounded-full ${themeClasses.bgSecondary} ${themeClasses.textPrimary} hover:bg-gray-200 dark:hover:bg-gray-700`}
                  >
                    <IoMdRemove size={16} />
                  </button>
                  <span className={`text-lg font-medium ${themeClasses.textPrimary}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={`p-2 rounded-full ${themeClasses.bgSecondary} ${themeClasses.textPrimary} hover:bg-gray-200 dark:hover:bg-gray-700`}
                  >
                    <IoMdAdd size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {calculateTotalPrice().toFixed(2)}₺
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>
                    Toplam Fiyat
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-colors active:scale-95"
              >
                Sepete Ekle
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuItemDetail;
