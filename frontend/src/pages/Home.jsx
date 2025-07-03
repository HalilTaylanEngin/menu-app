import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { themeClasses } = useTheme();

  const quickActions = [
    { id: 1, title: "Menüyü Gözat", description: "Lezzetli ürünlerimizi keşfedin", icon: "🍽️", link: "/menu", color: "bg-blue-500" },
    { id: 2, title: "Ayarlar", description: "Deneyiminizi özelleştirin", icon: "⚙️", link: "/options", color: "bg-purple-500" },
    { id: 3, title: "Favoriler", description: "Kaydettiğiniz ürünler", icon: "❤️", link: "/menu", color: "bg-red-500" },
    { id: 4, title: "Sipariş Geçmişi", description: "Geçmiş siparişlerinizi görün", icon: "📋", link: "/menu", color: "bg-green-500" },
  ];

  return (
    <div className={`min-h-screen transition-colors ${themeClasses.bgSecondary}`}>
      {/* Hero Section */}
      <div className={`px-4 py-8 text-center ${themeClasses.bgPrimary}`}>
        <div className="text-6xl mb-4">🍴</div>
        <h1 className={`text-3xl font-bold mb-2 ${themeClasses.textPrimary}`}>
          Hoş Geldiniz!
        </h1>
        <p className={`text-lg ${themeClasses.textSecondary}`}>
          Bugün ne sipariş etmek istersiniz?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6 pb-20">
        <h2 className={`text-xl font-semibold mb-4 ${themeClasses.textPrimary}`}>
          Hızlı İşlemler
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className={`p-4 rounded-2xl border transition-all duration-200 active:scale-95 ${themeClasses.bgPrimary} ${themeClasses.border} shadow-sm hover:shadow-md`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className={`font-semibold mb-1 ${themeClasses.textPrimary}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Section */}
        <div className="mt-8">
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.textPrimary}`}>
            Günün Önerileri
          </h2>
          
          <div className={`p-6 rounded-2xl border ${themeClasses.bgPrimary} ${themeClasses.border} text-center`}>
            <div className="text-4xl mb-3">⭐</div>
            <h3 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary}`}>
              Özel Kombo Menü
            </h3>
            <p className={`${themeClasses.textSecondary} mb-4`}>
              Herhangi bir burger + patates + içecek sadece 15.99$
            </p>
            <Link 
              to="/menu"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors active:scale-95"
            >
              Hemen Sipariş Ver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
