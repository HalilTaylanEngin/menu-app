# Backend - Restaurant Menu App API

Express.js REST API server for the restaurant menu application with MongoDB integration.

## 🚀 Features

- **RESTful API** - Complete CRUD operations
- **Authentication** - JWT-based secure authentication
- **Database** - MongoDB with Mongoose ODM
- **Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error management
- **CORS** - Cross-origin resource sharing
- **Middleware** - Authentication and validation middleware

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📡 API Endpoints

### Authentication Routes
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user  
GET    /api/auth/me          # Get current user (protected)
```

### Menu Routes
```
GET    /api/menu             # Get all menu items
GET    /api/menu/:id         # Get single menu item
POST   /api/menu             # Create menu item (admin only)
PUT    /api/menu/:id         # Update menu item (admin only)
DELETE /api/menu/:id         # Delete menu item (admin only)
```

## 🗂️ Project Structure

```
backend/
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── MenuItem.js       # Menu item model
│   └── User.js          # User model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── menu.js          # Menu routes
├── .env.example         # Environment variables template
├── server.js            # Server entry point
└── package.json
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB 7+
- npm or yarn

### Environment Configuration

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**
   ```bash
   # Database
   MONGODB_URI=mongodb://localhost:27017/menu-app
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   
   # Server
   PORT=5000
   NODE_ENV=development
   ```

### Installation & Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 🔒 Authentication

### JWT Token Structure
```javascript
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "admin" // or "user"
  }
}
```

### Protected Routes
- All menu modification endpoints require admin role
- Authentication via `Authorization: Bearer <token>` header

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'admin'),
  createdAt: Date
}
```

### MenuItem Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Environment Setup
```bash
# Production environment
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
```

### Build & Start
```bash
npm install --production
npm start
```
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and JWT secret.

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS
