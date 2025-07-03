import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ClickableArea = () => {
  const [clickCount, setClickCount] = useState(0);
  const { themeClasses } = useTheme();

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const resetCount = () => {
    setClickCount(0);
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
        Interaktif Demo
      </h3>
      
      <div className={`p-6 rounded-2xl border transition-colors ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <div className="text-center space-y-4">
          <div className="text-4xl mb-4">
            {clickCount === 0 ? "👆" : clickCount < 5 ? "🎉" : clickCount < 10 ? "🔥" : "🚀"}
          </div>
          
          <button 
            onClick={handleClick}
            className={`w-full py-4 rounded-2xl font-medium text-lg transition-all duration-200 active:scale-95 ${themeClasses.btnPrimary} shadow-lg`}
          >
            Bana Dokun!
          </button>
          
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
              Dokunma: <span className="text-blue-600">{clickCount}</span>
            </p>
            
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              {clickCount === 0 && "Dokunmaya başla, sihri gör! ✨"}
              {clickCount > 0 && clickCount < 5 && "Devam et! Harika gidiyorsun! 🌟"}
              {clickCount >= 5 && clickCount < 10 && "Vay canına, ateş gibisin! 🔥"}
              {clickCount >= 10 && "Sen dokunma şampiyonusun! 🏆"}
            </p>
          </div>

          {clickCount > 0 && (
            <button
              onClick={resetCount}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${themeClasses.btnSecondary}`}
            >
              Sayacı Sıfırla
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickableArea;
