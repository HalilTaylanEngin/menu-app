# 🍽️ Modern Restaurant Menu App

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue)](https://tailwindcss.com/)

A modern, responsive restaurant menu application built with the MERN stack. Features include menu management, user authentication, admin panel, and real-time updates.

## 🌟 Features

### ✅ **Completed Features (v2.0 - Branch2)**

#### 🎨 **Frontend Features**
- **Modern UI/UX**: Clean, mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Seamless theme switching with context management
- **Responsive Design**: Optimized for all device sizes
- **Menu Browsing**: Category filtering, search functionality
- **Image Management**: Real image support with fallback system
- **State Management**: Redux for efficient data handling
- **Smooth Animations**: Framer Motion for enhanced UX

#### ⚙️ **Backend Features**
- **REST API**: Complete CRUD operations for menu management
- **Authentication**: JWT-based secure authentication
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and error handling
- **CORS**: Cross-origin resource sharing configuration

#### 🔧 **Admin Panel**
- **Menu Management**: Add, edit, delete, and toggle menu items
- **User Preferences**: Persistent filter settings with localStorage
- **Image Selector**: Built-in image selection with category organization
- **Real-time Updates**: Instant menu updates without page refresh

#### 🚀 **Performance & Quality**
- **Production Ready**: Clean, optimized codebase
- **No Dev Dependencies**: Removed all development-only utilities
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth loading indicators

### 📂 **Project Structure**

```
menu-app/
├── backend/                 # Express.js API server
│   ├── middleware/         # Authentication & validation
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
│
├── frontend/              # React application
│   ├── public/           # Static assets
│   │   └── images/       # Product images (not included in repo)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store & slices
│   │   ├── context/      # React context providers
│   │   ├── utils/        # Utility functions
│   │   └── constants/    # Theme & configuration
│   └── package.json
│
└── README.md
```

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Icons** - Icon library

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 7+
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/menu-app.git
   cd menu-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend - Copy and configure
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Frontend - Create environment file if needed
   cd ../frontend
   # Create .env.local for any frontend environment variables
   ```

4. **Add Product Images** (Optional)
   ```bash
   # Create image directories in frontend/public/images/
   # See frontend/public/images/RESIM-REHBERI.md for structure
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend (from root)
   cd backend && npm run dev
   
   # Terminal 2 - Frontend (from root)  
   cd frontend && npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 **Usage**

### **For Users**
1. Browse menu items by category
2. Search for specific items
3. View detailed item information
4. Switch between light/dark themes

### **For Admins**
1. Navigate to `/admin` route
2. Access "Menü Yönetimi" (Menu Management)
3. Add, edit, or delete menu items
4. Toggle item active/inactive status
5. Filter and search through items

## 🎯 **What's New in v2.0**

### **Major Improvements**
- ✅ **Complete codebase cleanup** - Removed all dev-only utilities
- ✅ **Real image system** - Switched from placeholder to actual images
- ✅ **Admin panel** - Full-featured menu management interface
- ✅ **Persistent preferences** - localStorage for user settings
- ✅ **Enhanced UX** - React Icons, better theming, smooth animations
- ✅ **Production ready** - Clean, maintainable, scalable codebase

### **Technical Debt Resolved**
- Removed development-only hooks and utilities
- Simplified image loading without complex optimization
- Cleaned up console logging and debugging code
- Standardized component patterns and naming

## 🤝 **Contributing**

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 **Acknowledgments**

- Built with modern web technologies
- Responsive design principles
- Accessibility-first approach
- Performance optimized

---

**Note**: Product images are not included in this repository. Please add your own images following the structure outlined in `frontend/public/images/RESIM-REHBERI.md`.
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB (local or cloud)

### Setup
```bash
# Clone the repository
git clone https://github.com/HalilTaylanEngin/menu-app.git
cd menu-app

# Install dependencies for both frontend and backend
npm run install:all

# Set up environment variables
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret

# Start both frontend and backend
npm run dev
```

**Frontend**: `http://localhost:5173`
**Backend**: `http://localhost:5000`

## 📁 Project Structure

```
menu-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Express.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
└── README.md               # Project documentation
```

## 🎯 Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production
- `npm run install:all` - Install dependencies for both apps

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)
- `npm run preview` - Preview production build

## 📝 License

MIT License

---

**Note**: This is a starter project. Backend and database features will be added in future updates.
