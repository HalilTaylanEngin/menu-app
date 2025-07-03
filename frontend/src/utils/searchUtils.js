// Türkçe karakterleri normalize eden utility fonksiyonu
export const normalizeText = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
};

// Gelişmiş arama fonksiyonu
export const searchFilter = (items, searchQuery, searchFields = ['name', 'category', 'description']) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return items;
  }

  const normalizedQuery = normalizeText(searchQuery);
  
  return items.filter(item => {
    return searchFields.some(field => {
      const fieldValue = item[field];
      if (fieldValue) {
        const normalizedField = normalizeText(fieldValue.toString());
        return normalizedField.includes(normalizedQuery);
      }
      return false;
    });
  });
};
