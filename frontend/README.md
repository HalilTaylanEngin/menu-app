# Frontend - Restaurant Menu App

Modern React application for restaurant menu browsing and management.

## 🚀 Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Theme Support**: Dark/Light mode with smooth transitions
- **Menu Browsing**: Category filtering and search functionality
- **Admin Panel**: Complete menu management interface
- **Image Management**: Real image support with fallback system
- **State Management**: Redux for efficient data handling
- **Animations**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BottomNavigation.jsx
│   ├── CategoryFilter.jsx
│   ├── ImageSelector.jsx
│   ├── MenuItemDetail.jsx
│   ├── MenuItemImage.jsx
│   └── ...
├── pages/              # Page components
│   ├── Admin.jsx
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── MenuManagement.jsx
│   └── Options.jsx
├── store/              # Redux store
│   ├── index.js
│   ├── menuSlice.js
│   └── cartSlice.js
├── context/            # React context
│   └── ThemeContext.jsx
├── constants/          # Configuration
│   └── theme.js
└── utils/             # Utility functions
    └── searchUtils.js
```

## 🎨 Components

### Core Components
- **MenuItemImage**: Handles image loading with fallbacks
- **CategoryFilter**: Category selection with icons
- **ImageSelector**: Admin image selection interface
- **MenuItemDetail**: Modal for item details
- **ThemeToggle**: Dark/light mode switcher

### Pages
- **Home**: Landing page
- **Menu**: Main menu browsing interface
- **Admin**: Admin dashboard
- **MenuManagement**: Complete CRUD for menu items
- **Options**: Settings and preferences

## 🔧 Configuration

### Environment Variables
Create `.env.local` file:
```bash
VITE_API_URL=http://localhost:5000
```

### Image Structure
Images should be placed in `public/images/` following this structure:
```
public/images/
├── et-yemekleri/
├── makarnalar/
├── salatalar/
├── alkolsuz-icecekler/
└── ara-sicaklar/
```

See `public/images/RESIM-REHBERI.md` for detailed instructions.

## 🎯 Features Details

### State Management
- **Redux Toolkit** for global state
- **localStorage** for persistent preferences
- **React Context** for theme management

### Routing
- **React Router v6** for navigation
- Protected admin routes
- Dynamic route parameters

### Styling
- **Tailwind CSS** for responsive design
- **CSS Variables** for theme switching
- **Mobile-first** approach

### Performance
- **Lazy loading** for images
- **Code splitting** with React.lazy
- **Optimized builds** with Vite

## 🚀 Deployment

```bash
# Build for production
npm run build

# Serve build locally
npm run preview
```

The `dist/` folder contains the production build ready for deployment.

## 🔗 API Integration

The frontend communicates with the backend API for:
- Menu item CRUD operations
- User authentication
- Image management
- Real-time updates

See `../backend/README.md` for API documentation.
