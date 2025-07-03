import React from "react";
import { useTheme } from "../context/ThemeContext";

const PageHeader = ({ title }) => {
  const { themeClasses } = useTheme();

  return (
    <div>
      <h1 className={`text-3xl font-bold mb-4 ${themeClasses.textPrimary}`}>{title}</h1>
      <p className={themeClasses.textSecondary}>{`${title} sayfasına hoş geldiniz!`}</p>
    </div>
  );
};

export default PageHeader;
