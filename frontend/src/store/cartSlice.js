import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Sepetteki ürünler
  totalAmount: 0,
  totalItems: 0,
  isOpen: false, // Sepet modal'ı açık mı?
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Sepete ürün ekleme
    addToCart: (state, action) => {
      const { menuItem, selectedSize, selectedExtras, quantity, totalPrice } = action.payload;
      
      // Aynı ürün, aynı boyut ve ekstralar varsa quantity'yi artır
      const existingItemIndex = state.items.findIndex(item => 
        item.menuItem.id === menuItem.id && 
        item.selectedSize === selectedSize &&
        JSON.stringify(item.selectedExtras) === JSON.stringify(selectedExtras)
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
        state.items[existingItemIndex].totalPrice += totalPrice;
      } else {
        state.items.push({
          id: Date.now(), // Unique cart item ID
          menuItem,
          selectedSize,
          selectedExtras,
          quantity,
          totalPrice
        });
      }

      // Toplam hesaplama
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Sepetten ürün çıkarma
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Ürün miktarını güncelleme
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      
      if (index !== -1) {
        if (quantity <= 0) {
          state.items.splice(index, 1);
        } else {
          const item = state.items[index];
          const unitPrice = item.totalPrice / item.quantity;
          state.items[index].quantity = quantity;
          state.items[index].totalPrice = unitPrice * quantity;
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    // Sepeti temizleme
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    // Sepet modal'ını açma/kapama
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    // Toplam hesaplama (internal reducer)
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    // Loading state
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error state
    setCartError: (state, action) => {
      state.error = action.payload;
    },

    clearCartError: (state) => {
      state.error = null;
    }
  }
});

// Actions export
export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  setCartLoading,
  setCartError,
  clearCartError
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartItemsCount = (state) => state.cart.totalItems;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

// İs cart empty selector
export const selectCartIsEmpty = (state) => state.cart.items.length === 0;

export default cartSlice.reducer;
