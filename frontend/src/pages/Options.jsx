import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from '../components/ThemeToggle'
import SettingsItem from '../components/SettingsItem'
import { FiBell, FiMapPin, FiInfo, FiUser, FiShield } from "react-icons/fi";

const Options = () => {
  const { themeClasses } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    // Basit admin kontrolü (gerçek uygulamada backend ile doğrulanmalı)
    if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setAdminCredentials({ username: '', password: '' });
      // Admin sayfasına yönlendir
      navigate('/admin');
    } else {
      alert('Hatalı kullanıcı adı veya şifre!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminCredentials({ username: '', password: '' });
  };

  return (
    <div className={`min-h-screen transition-colors ${themeClasses.bgSecondary}`}>
      {/* Mobile Header */}
      <div className={`sticky top-0 z-10 px-4 py-2 border-b transition-colors ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <h1 className={`text-xl font-bold text-center ${themeClasses.textPrimary}`}>Ayarlar</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-2 pb-14 space-y-4">
        <ThemeToggle />
        
        {/* Additional Settings Sections */}
        <div className="space-y-3">
          <h3 className={`text-base font-semibold ${themeClasses.textPrimary}`}>
            Hesap Ayarları
          </h3>
          
          <SettingsItem
            title="Bildirimler"
            description="Push bildirimleri al"
            icon={{
              component: <FiBell className="w-5 h-5 text-white" />,
              bgColor: 'bg-green-500'
            }}
            type="toggle"
            isActive={notifications}
            onToggle={() => setNotifications(!notifications)}
          />

          <SettingsItem
            title="Konum Servisleri"
            description="Konum erişimine izin ver"
            icon={{
              component: <FiMapPin className="w-5 h-5 text-white" />,
              bgColor: 'bg-blue-500'
            }}
            type="toggle"
            isActive={locationServices}
            onToggle={() => setLocationServices(!locationServices)}
          />
        </div>

        {/* Admin Section */}
        <div className="space-y-3">
          <h3 className={`text-base font-semibold ${themeClasses.textPrimary}`}>
            Yönetici Paneli
          </h3>
          
          {!isAdminLoggedIn ? (
            <SettingsItem
              title="Admin Girişi"
              description="Yönetici paneline erişim"
              icon={{
                component: <FiUser className="w-5 h-5 text-white" />,
                bgColor: 'bg-orange-500'
              }}
              type="button"
              onClick={() => setShowAdminLogin(!showAdminLogin)}
            />
          ) : (
            <SettingsItem
              title="Admin Paneli"
              description="Yönetici olarak giriş yapıldı"
              icon={{
                component: <FiShield className="w-5 h-5 text-white" />,
                bgColor: 'bg-green-500'
              }}
              type="button"
              onClick={handleAdminLogout}
            >
              <div className="text-right">
                <div className={`text-sm font-medium text-green-600`}>Aktif</div>
                <div className={`text-xs ${themeClasses.textSecondary}`}>Çıkış için tıkla</div>
              </div>
            </SettingsItem>
          )}

          {/* Admin Login Form */}
          {showAdminLogin && !isAdminLoggedIn && (
            <div className={`p-3 rounded-xl border ${themeClasses.bgPrimary} ${themeClasses.border}`}>
              <div className="space-y-2">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${themeClasses.textPrimary}`}>
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeClasses.border} ${themeClasses.bgSecondary} ${themeClasses.textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="admin"
                  />
                </div>
                
                <div>
                  <label className={`block text-xs font-medium mb-1 ${themeClasses.textPrimary}`}>
                    Şifre
                  </label>
                  <input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeClasses.border} ${themeClasses.bgSecondary} ${themeClasses.textPrimary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => setShowAdminLogin(false)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:${themeClasses.bgSecondary}`}
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className={`text-base font-semibold ${themeClasses.textPrimary}`}>
            Uygulama Bilgisi
          </h3>
          
          <SettingsItem
            title="Uygulama Bilgileri"
            icon={{
              component: <FiInfo className="w-5 h-5 text-white" />,
              bgColor: 'bg-purple-500'
            }}
            type="value"
          >
            <div className="text-right">
              <div className={`text-sm ${themeClasses.textSecondary}`}>Sürüm</div>
              <div className={`font-medium ${themeClasses.textPrimary}`}>1.0.0</div>
            </div>
          </SettingsItem>

          <SettingsItem
            title="Yapı Bilgileri"
            icon={{
              component: <FiInfo className="w-5 h-5 text-white" />,
              bgColor: 'bg-gray-500'
            }}
            type="value"
          >
            <div className="text-right">
              <div className={`text-sm ${themeClasses.textSecondary}`}>Yapı</div>
              <div className={`font-medium ${themeClasses.textPrimary}`}>2025.1.1</div>
            </div>
          </SettingsItem>
        </div>
      </div>
    </div>
  )
}

export default Options