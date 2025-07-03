import React from "react";
import { useTheme } from "../context/ThemeContext";

const SettingsItem = ({ 
  title, 
  description, 
  icon, 
  type = "toggle", 
  isActive = false, 
  onToggle, 
  onClick,
  rightContent,
  children 
}) => {
  const { themeClasses } = useTheme();

  const renderRightContent = () => {
    if (rightContent) {
      return rightContent;
    }

    if (type === "toggle") {
      return (
        <button
          onClick={onToggle}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            isActive ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
              isActive ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      );
    }

    if (type === "value") {
      return children;
    }

    if (type === "button") {
      return children;
    }

    return null;
  };

  const isClickable = type === "button" && onClick;

  return (
    <div 
      className={`p-3 rounded-xl border transition-colors ${themeClasses.bgPrimary} ${themeClasses.border} ${
        isClickable ? 'cursor-pointer hover:shadow-md active:scale-95' : ''
      }`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-center justify-between py-0.5">
        <div className="flex items-center space-x-3 flex-1">
          {icon && (
            <div className={`p-2 rounded-lg ${icon.bgColor || 'bg-gray-500'} transition-colors`}>
              {icon.component}
            </div>
          )}
          <div className="flex-1">
            <span className={`font-medium text-sm ${themeClasses.textPrimary}`}>
              {title}
            </span>
            {description && (
              <p className={`text-xs ${themeClasses.textSecondary} mt-0.5`}>
                {description}
              </p>
            )}
          </div>
        </div>
        
        <div className="ml-3">
          {renderRightContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsItem;
