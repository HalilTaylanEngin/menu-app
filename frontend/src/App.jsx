import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from "./context/ThemeContext";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Options from "./pages/Options";
import Admin from "./pages/Admin";
import MenuManagement from "./pages/MenuManagement";

const AppContent = () => {
  const location = useLocation();
  // Ana admin sayfasında BottomNav göster, alt sayfalarda gizle
  const isAdminSubPage = location.pathname.startsWith('/admin/');

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/options" element={<Options />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/menu-management" element={<MenuManagement />} />
        {/* Add more routes as needed */}
      </Routes>
      {!isAdminSubPage && <BottomNavigation />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
