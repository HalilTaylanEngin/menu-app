import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Options from "./pages/Options";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/options" element={<Options />} />
            <Route path="/admin" element={<Admin />} />
            {/* Add more routes as needed */}
          </Routes>
          <BottomNavigation />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
