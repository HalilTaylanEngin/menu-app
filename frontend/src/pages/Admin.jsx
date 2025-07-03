import React from 'react'
import { useTheme } from "../context/ThemeContext";
import { FiGrid, FiUsers, FiSettings, FiBarChart2, FiPackage } from "react-icons/fi";

const Admin = () => {
  const { themeClasses } = useTheme();

  const adminSections = [
    {
      id: 'menu-management',
      title: 'Menü Yönetimi',
      description: 'Ürünleri ekle, düzenle ve sil',
      icon: FiPackage,
      color: 'bg-blue-500',
      comingSoon: true
    },
    {
      id: 'orders',
      title: 'Sipariş Yönetimi',
      description: 'Gelen siparişleri görüntüle ve yönet',
      icon: FiGrid,
      color: 'bg-green-500',
      comingSoon: true
    },
    {
      id: 'users',
      title: 'Kullanıcı Yönetimi',
      description: 'Kullanıcıları görüntüle ve yönet',
      icon: FiUsers,
      color: 'bg-purple-500',
      comingSoon: true
    },
    {
      id: 'analytics',
      title: 'Raporlar & Analitik',
      description: 'Satış raporları ve istatistikler',
      icon: FiBarChart2,
      color: 'bg-orange-500',
      comingSoon: true
    },
    {
      id: 'settings',
      title: 'Sistem Ayarları',
      description: 'Uygulama ayarlarını yapılandır',
      icon: FiSettings,
      color: 'bg-gray-500',
      comingSoon: true
    }
  ];

  return (
    <div className={`min-h-screen transition-colors ${themeClasses.bgSecondary}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-4 py-2 border-b transition-colors ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <h1 className={`text-xl font-bold text-center ${themeClasses.textPrimary}`}>Admin Panel</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-20">
        {/* Welcome Section */}
        <div className={`p-4 rounded-xl mb-4 ${themeClasses.bgPrimary} ${themeClasses.border} border`}>
          <h2 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary}`}>
            Hoş Geldiniz!
          </h2>
          <p className={`text-sm ${themeClasses.textSecondary}`}>
            Admin paneline hoş geldiniz. Buradan uygulamanızı yönetebilirsiniz.
          </p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {adminSections.map((section) => (
            <div
              key={section.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                section.comingSoon 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95'
              } ${themeClasses.bgPrimary} ${themeClasses.border}`}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={`p-2 rounded-lg ${section.color} flex-shrink-0`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm ${themeClasses.textPrimary}`}>
                      {section.title}
                    </h3>
                    {section.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Yakında
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${themeClasses.textSecondary} leading-relaxed`}>
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-6">
          <h3 className={`text-base font-semibold mb-3 ${themeClasses.textPrimary}`}>
            Hızlı Bakış
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Toplam Ürün', value: '12', color: 'text-blue-600' },
              { label: 'Aktif Siparişler', value: '0', color: 'text-green-600' },
              { label: 'Kullanıcılar', value: '1', color: 'text-purple-600' },
              { label: 'Günlük Satış', value: '0₺', color: 'text-orange-600' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border ${themeClasses.bgPrimary} ${themeClasses.border} text-center`}
              >
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${themeClasses.textSecondary}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Note */}
        <div className={`mt-6 p-3 rounded-xl border-l-4 border-l-blue-500 ${themeClasses.bgPrimary} ${themeClasses.border}`}>
          <div className={`text-xs font-medium ${themeClasses.textPrimary} mb-1`}>
            Geliştirici Notu
          </div>
          <div className={`text-xs ${themeClasses.textSecondary}`}>
            Bu admin paneli henüz geliştirme aşamasındadır. Özellikler yakında eklenecektir.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
