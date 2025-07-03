# Menu App - MERN Stack Project

A modern restaurant menu application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Project Status - Branch2

This branch includes significant improvements and new features compared to the main branch.

### ✅ **NEW in Branch2**
- **🎨 Advanced UI/UX**: Complete redesign with modern components
- **🖼️ Real Image System**: Production-ready image management with fallbacks
- **⚡ Redux State Management**: Full Redux integration for menu and cart
- **🔧 Admin Panel**: Complete menu management system with CRUD operations
- **🎯 Smart Filtering**: Advanced search and category filtering
- **🌓 Theme System**: Dark/Light mode with persistent preferences
- **💾 LocalStorage**: User preferences saved across sessions
- **📱 Mobile-First**: Responsive design optimized for all devices
- **🧹 Clean Architecture**: Production-ready codebase without dev utilities

### ✅ Current Features
- **Frontend**: React with Redux, Tailwind CSS, Framer Motion
- **Backend**: Express.js API with MongoDB integration
- **Authentication**: JWT-based user authentication
- **Menu Management**: Full CRUD operations with image management
- **User Roles**: Admin and regular user roles
- **API Validation**: Input validation and error handling
- **Real-time Updates**: Live menu updates with Redux
- **Search & Filter**: Advanced filtering by category and search terms

## 📋 **Setup Instructions**

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### � **Quick Start**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd menu-app
   git checkout branch2  # Switch to the latest branch
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Add your images** (Important!)
   ```bash
   # Add your menu item images to:
   frontend/public/images/et-yemekleri/
   frontend/public/images/makarnalar/
   frontend/public/images/salatalar/
   frontend/public/images/alkolsuz-icecekler/
   # etc... (see RESIM-REHBERI.md for details)
   ```

4. **Environment setup**
   ```bash
   # Create backend/.env file:
   MONGODB_URI=mongodb://localhost:27017/menu-app
   JWT_SECRET=your-jwt-secret-here
   PORT=5000
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:5173/admin

### �🔮 Planned Features
- Order management system
- Payment integration
- Email notifications
- Advanced admin dashboard
- File upload for menu images
- Real-time notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework with hooks
- **Redux Toolkit** - State management
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
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
