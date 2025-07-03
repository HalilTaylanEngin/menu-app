import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NavigationButton = ({ to, label, isActive }) => {
const { themeClasses } = useTheme();

return (
    <Link
        to={to}
        className={`flex md:flex-col items-center justify-center py-2 px-2 md:px-3 rounded-xl transition-all duration-200 active:scale-95 min-w-0 ${
            isActive
                ? themeClasses.navActive
                : themeClasses.navInactive
        }`}
    >
        {typeof label !== "string" && label.icon && (
            <span className={`text-lg ${isActive ? '' : ''}`}>
                {React.createElement(label.icon, {
                    color: isActive ? "#2563eb" : "#6b7280",
                    size: 24
                })}
            </span>
        )}
        <span className="hidden md:block text-xs font-medium truncate max-w-full mt-1">
            {typeof label === "string" ? label : label.text}
        </span>
    </Link>
);
};

export default NavigationButton;
