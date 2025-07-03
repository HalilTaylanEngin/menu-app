import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import SettingsItem from "./SettingsItem";

const ThemeToggle = () => {
  const { isDark, toggleTheme, themeClasses } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
        Görünüm
      </h3>
      
      <SettingsItem
        title={isDark ? 'Karanlık Mod' : 'Aydınlık Mod'}
        description={isDark ? 'Gözlerinizi yormuyor' : 'Parlak ve net'}
        icon={{
          component: isDark ? <FiMoon className="w-5 h-5 text-white" /> : <FiSun className="w-5 h-5 text-white" />,
          bgColor: isDark ? 'bg-blue-500' : 'bg-yellow-500'
        }}
        type="toggle"
        isActive={isDark}
        onToggle={toggleTheme}
      />
    </div>
  );
};

export default ThemeToggle;
