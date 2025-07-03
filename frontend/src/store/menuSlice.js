import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialMenuItems = [
  { id: 1, name: "Izgara Köfte", category: "Ana Yemekler", price: "12.99", description: "Sulu et köftesi ve taze marul", image: "/images/et-yemekleri/izgara-kofte.png", isActive: true },
  { id: 2, name: "Penne Alfredo", category: "Ana Yemekler", price: "15.99", description: "Kremalı alfredo sosu ve parmesan", image: "/images/makarnalar/penne-alfredo.png", isActive: true },
  { id: 3, name: "Akdeniz Salatası", category: "Sağlıklı", price: "8.99", description: "Çıtır marul ve parmesan peyniri", image: "/images/salatalar/akdeniz-salatasi.png", isActive: true },
  { id: 4, name: "Mantarlı Bavette", category: "Ana Yemekler", price: "13.99", description: "Mantarlı bavette makarna", image: "/images/makarnalar/mantarlı-bavette.png", isActive: true },
  { id: 5, name: "Espresso Kahve", category: "İçecekler", price: "3.99", description: "Güçlü ve aromatik kahve", image: "/images/alkolsuz-icecekler/espresso.png", isActive: true },
  { id: 6, name: "Cappuccino", category: "İçecekler", price: "5.99", description: "Kremalı cappuccino", image: "/images/alkolsuz-icecekler/cappuccino.png", isActive: true },
  { id: 7, name: "Adana Kebap", category: "Ana Yemekler", price: "16.99", description: "Geleneksel adana kebap", image: "/images/et-yemekleri/adana-kebap.png", isActive: true },
  { id: 8, name: "Türk Kahvesi", category: "İçecekler", price: "4.99", description: "Geleneksel türk kahvesi", image: "/images/alkolsuz-icecekler/turk-kahvesi.png", isActive: true },
  { id: 9, name: "Çoban Salata", category: "Sağlıklı", price: "6.99", description: "Taze sebzeli çoban salata", image: "/images/salatalar/coban-salata.png", isActive: true },
  { id: 10, name: "Sigara Böreği", category: "Tatlılar", price: "7.99", description: "Çıtır sigara böreği", image: "/images/ara-sicaklar/sigara-boregi.png", isActive: true },
  { id: 11, name: "Bonfile Izgara", category: "Ana Yemekler", price: "22.99", description: "Lezzetli bonfile izgara", image: "/images/et-yemekleri/bonfile-izgara.png", isActive: true },
  { id: 12, name: "Peynir Tabağı", category: "Tatlılar", price: "12.99", description: "Çeşitli peynir tabağı", image: "/images/ara-sicaklar/peynir-tabagi.png", isActive: true },
];

const initialState = {
  items: initialMenuItems,
  categories: [
    { id: "All", label: "Tümü" },
    { id: "Ana Yemekler", label: "Ana Yemekler" },
    { id: "İçecekler", label: "İçecekler" },
    { id: "Sağlıklı", label: "Sağlıklı" },
    { id: "Tatlılar", label: "Tatlılar" },
  ],
  nextId: 13,
  loading: false,
  error: null
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Ürün ekleme
    addMenuItem: (state, action) => {
      const newItem = {
        ...action.payload,
        id: state.nextId,
        price: parseFloat(action.payload.price).toFixed(2),
        isActive: action.payload.isActive ?? true
      };
      state.items.push(newItem);
      state.nextId += 1;
    },

    // Ürün güncelleme
    updateMenuItem: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updates,
          price: updates.price ? parseFloat(updates.price).toFixed(2) : state.items[index].price
        };
      }
    },

    // Ürün silme
    deleteMenuItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Ürün aktif/pasif yapma
    toggleMenuItemActive: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.items[index].isActive = !state.items[index].isActive;
      }
    },

    // Kategori ekleme
    addCategory: (state, action) => {
      const exists = state.categories.find(cat => cat.id === action.payload.id);
      if (!exists) {
        state.categories.push(action.payload);
      }
    },

    // Loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error state
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Actions export
export const {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemActive,
  addCategory,
  setLoading,
  setError,
  clearError
} = menuSlice.actions;

// Basic selectors
export const selectAllMenuItems = (state) => state.menu.items;
export const selectMenuCategories = (state) => state.menu.categories;
export const selectMenuLoading = (state) => state.menu.loading;
export const selectMenuError = (state) => state.menu.error;

// Memoized selectors
export const selectActiveMenuItems = createSelector(
  [selectAllMenuItems],
  (items) => items.filter(item => item.isActive)
);

export const selectMenuItemsByCategory = createSelector(
  [selectAllMenuItems, (state, category) => category],
  (items, category) => {
    if (category === 'All') return items.filter(item => item.isActive);
    return items.filter(item => item.category === category && item.isActive);
  }
);

export const selectMenuItemsCount = createSelector(
  [selectAllMenuItems],
  (items) => ({
    total: items.length,
    active: items.filter(item => item.isActive).length,
    inactive: items.filter(item => !item.isActive).length
  })
);

// Admin panel için filtered items selector
export const selectFilteredMenuItems = createSelector(
  [selectAllMenuItems, (state, searchTerm) => searchTerm, (state, searchTerm, category) => category, (state, searchTerm, category, showInactive) => showInactive],
  (items, searchTerm, category, showInactive) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || item.category === category;
      const matchesActiveStatus = showInactive || item.isActive;
      
      return matchesSearch && matchesCategory && matchesActiveStatus;
    });
  }
);

export default menuSlice.reducer;
