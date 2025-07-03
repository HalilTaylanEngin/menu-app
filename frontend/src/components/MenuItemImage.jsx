import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi';

const MenuItemImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackEmoji = "🍽️",
  size = "medium",
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-24 h-24",
    xl: "w-32 h-32",
    full: "w-full h-full"
  };

  // Get image URL from public folder
  const getImageUrl = (src) => {
    if (!src) return null;
    
    // If it starts with /images/, use it directly from public folder
    if (src.startsWith('/images/')) {
      return src;
    }
    
    // If it's a relative path, make it absolute
    if (src.startsWith('images/')) {
      return `/${src}`;
    }
    
    // Otherwise, assume it's a direct path
    return src;
  };

  const imageUrl = getImageUrl(src);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Show fallback if no image or error
  if (!src || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600`}>
        <div className="text-center">
          <span className="text-2xl mb-1 block">{fallbackEmoji}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Resim yok</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg`}>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <FiImage className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
};

export default MenuItemImage;
