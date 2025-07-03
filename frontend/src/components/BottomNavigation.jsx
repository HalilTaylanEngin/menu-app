import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import NavigationButton from "./NavigationButton";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoRestaurantOutline, IoRestaurant } from "react-icons/io5";
import { FiSettings, FiMoreHorizontal } from "react-icons/fi";

const BottomNavigation = () => {
  const location = useLocation();
  const { themeClasses } = useTheme();

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t px-4 py-1 md:py-2 transition-colors backdrop-blur-lg bg-opacity-95 ${themeClasses.navBg} ${themeClasses.navBorder}`}>
      <div className="flex justify-around items-center max-w-sm md:max-w-md mx-auto">
        <NavigationButton
          to="/"
          label={{
            icon: location.pathname === "/" ? AiFillHome : AiOutlineHome,
            text: "Ana Sayfa"
          }}
          isActive={location.pathname === "/"}
        />
        <NavigationButton
          to="/menu"
          label={{
            icon: location.pathname === "/menu" ? IoRestaurant : IoRestaurantOutline,
            text: "Menü"
          }}
          isActive={location.pathname === "/menu"}
        />
        <NavigationButton
          to="/options"
          label={{
            icon: FiSettings,
            text: "Ayarlar"
          }}
          isActive={location.pathname === "/options"}
        />
      </div>
    </nav>
  );
};

export default BottomNavigation;
