import React, { useState } from 'react';
import { FiUpload, FiImage, FiX } from 'react-icons/fi';
import MenuItemImage from './MenuItemImage';

const ImageSelector = ({ 
  currentImage, 
  onImageSelect, 
  themeClasses,
  className = "",
  category = "Ana Yemekler" // Yeni prop: hangi kategorideki resimleri göstereceğini belirler
}) => {
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Gerçek resim seçenekleri - public/images klasöründen
  const imageOptions = [
    // Et Yemekleri
    { id: 'adana-kebap', url: '/images/et-yemekleri/adana-kebap.png', name: 'Adana Kebap', emoji: '🍖', category: 'Et Yemekleri' },
    { id: 'bonfile-izgara', url: '/images/et-yemekleri/bonfile-izgara.png', name: 'Bonfile Izgara', emoji: '🥩', category: 'Et Yemekleri' },
    { id: 'izgara-kofte', url: '/images/et-yemekleri/izgara-kofte.png', name: 'Izgara Köfte', emoji: '🍔', category: 'Et Yemekleri' },
    { id: 'kuzu-sis', url: '/images/et-yemekleri/kuzu-sis.png', name: 'Kuzu Şiş', emoji: '🍢', category: 'Et Yemekleri' },
    { id: 'pirzola', url: '/images/et-yemekleri/pirzola.png', name: 'Pirzola', emoji: '🥩', category: 'Et Yemekleri' },
    { id: 'steak', url: '/images/et-yemekleri/steak.png', name: 'Steak', emoji: '🥩', category: 'Et Yemekleri' },
    
    // Makarnalar
    { id: 'penne-alfredo', url: '/images/makarnalar/penne-alfredo.png', name: 'Penne Alfredo', emoji: '🍝', category: 'Makarnalar' },
    { id: 'mantarli-bavette', url: '/images/makarnalar/mantarlı-bavette.png', name: 'Mantarlı Bavette', emoji: '🍝', category: 'Makarnalar' },
    { id: 'bolognose', url: '/images/makarnalar/bolognose.png', name: 'Bolognese', emoji: '🍝', category: 'Makarnalar' },
    { id: 'mediterranean', url: '/images/makarnalar/mediterranean.png', name: 'Mediterranean', emoji: '🍝', category: 'Makarnalar' },
    
    // Salatalar
    { id: 'akdeniz-salatasi', url: '/images/salatalar/akdeniz-salatasi.png', name: 'Akdeniz Salatası', emoji: '🥗', category: 'Salatalar' },
    { id: 'coban-salata', url: '/images/salatalar/coban-salata.png', name: 'Çoban Salata', emoji: '🥗', category: 'Salatalar' },
    { id: 'greek-salata', url: '/images/salatalar/greek-salata.png', name: 'Greek Salata', emoji: '🥗', category: 'Salatalar' },
    { id: 'mevsim-salata', url: '/images/salatalar/mevsim-salata.png', name: 'Mevsim Salata', emoji: '🥗', category: 'Salatalar' },
    
    // Alkolsüz İçecekler
    { id: 'espresso', url: '/images/alkolsuz-icecekler/espresso.png', name: 'Espresso', emoji: '☕', category: 'İçecekler' },
    { id: 'cappuccino', url: '/images/alkolsuz-icecekler/cappuccino.png', name: 'Cappuccino', emoji: '☕', category: 'İçecekler' },
    { id: 'turk-kahvesi', url: '/images/alkolsuz-icecekler/turk-kahvesi.png', name: 'Türk Kahvesi', emoji: '☕', category: 'İçecekler' },
    { id: 'bardak-cay', url: '/images/alkolsuz-icecekler/bardak-cay.png', name: 'Bardak Çay', emoji: '🍵', category: 'İçecekler' },
    { id: 'ayran', url: '/images/alkolsuz-icecekler/ayran.png', name: 'Ayran', emoji: '🥛', category: 'İçecekler' },
    
    // Ara Sıcaklar
    { id: 'sigara-boregi', url: '/images/ara-sicaklar/sigara-boregi.png', name: 'Sigara Böreği', emoji: '🥟', category: 'Ara Sıcaklar' },
    { id: 'peynir-tabagi', url: '/images/ara-sicaklar/peynir-tabagi.png', name: 'Peynir Tabağı', emoji: '🧀', category: 'Ara Sıcaklar' },
    { id: 'kalamar', url: '/images/ara-sicaklar/kalamar.png', name: 'Kalamar', emoji: '🦑', category: 'Ara Sıcaklar' },
    { id: 'karides-guvec', url: '/images/ara-sicaklar/karides-guvec.png', name: 'Karides Güveç', emoji: '🦐', category: 'Ara Sıcaklar' },
  ];

  // Kategorileri çıkar
  const categories = ['Tümü', ...new Set(imageOptions.map(img => img.category))];

  // Seçili kategoriye göre resimleri filtrele
  const filteredImages = selectedCategory === 'Tümü' 
    ? imageOptions 
    : imageOptions.filter(img => img.category === selectedCategory);

  const handleImageSelect = (imageUrl) => {
    onImageSelect(imageUrl);
    setShowImageOptions(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <label className={`block text-sm font-medium mb-2 ${themeClasses.textPrimary}`}>
        Ürün Resmi
      </label>
      
      <div className="flex items-center space-x-4">
        {/* Mevcut resim önizleme */}
        <MenuItemImage 
          src={previewImage || currentImage} 
          alt="Ürün resmi" 
          size="large"
          className="border-2 border-dashed border-gray-300 dark:border-gray-600"
        />
        
        <div className="flex flex-col space-y-2">
          {/* Resim seçeneklerini göster/gizle */}
          <button
            type="button"
            onClick={() => setShowImageOptions(!showImageOptions)}
            className={`px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.textPrimary} hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center`}
          >
            <FiImage className="w-4 h-4 mr-2" />
            Resim Seç
          </button>
          
          {/* Dosya yükleme */}
          <label className={`px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.textPrimary} hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center cursor-pointer`}>
            <FiUpload className="w-4 h-4 mr-2" />
            Dosya Yükle
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          
          {/* Resmi kaldır */}
          {(currentImage || previewImage) && (
            <button
              type="button"
              onClick={() => {
                onImageSelect('');
                setPreviewImage(null);
              }}
              className="px-3 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
            >
              <FiX className="w-4 h-4 mr-2" />
              Kaldır
            </button>
          )}
        </div>
      </div>
      
      {/* Resim seçenekleri */}
      {showImageOptions && (
        <div className={`mt-4 p-4 rounded-lg border ${themeClasses.border} ${themeClasses.bgSecondary}`}>
          <h4 className={`text-sm font-medium mb-3 ${themeClasses.textPrimary}`}>
            Hazır Resimler
          </h4>
          
          {/* Kategori Seçici */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-500 text-white'
                      : `${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:bg-blue-100 dark:hover:bg-blue-900/20`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {filteredImages.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleImageSelect(option.url)}
                className={`p-2 rounded-lg border-2 hover:border-blue-500 transition-colors ${
                  currentImage === option.url 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : `border-gray-200 dark:border-gray-700`
                }`}
                title={option.name}
              >
                <MenuItemImage 
                  src={option.url} 
                  alt={option.name} 
                  size="small"
                  fallbackEmoji={option.emoji}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
