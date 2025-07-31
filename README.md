# MovieMasti - Advanced Movie Ticket Booking System

MovieMasti is a modern, full-stack movie ticket booking platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Experience cinema like never before with our intuitive interface and advanced features.

## ✨ Features

- **Modern UI/UX**: Sleek glassmorphism design with smooth animations
- **User Authentication**: Secure login/registration for both users and admins
- **Movie Management**: Browse, search, and discover movies
- **Ticket Booking**: Seamless seat selection and booking process
- **Admin Dashboard**: Complete movie and theatre management
- **Responsive Design**: Optimized for all devices
- **Dark/Light Mode**: Theme switching capability
- **Real-time Updates**: Live seat availability and booking status

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MovieMowa
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend Environment Setup:**

   Copy the example environment file and configure your variables:

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit the `.env` file with your actual values:

   ```env
   MONGODB_CONNECTION_LINK=mongodb+srv://username:password@cluster.mongodb.net/moviemowa
   JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend Environment Setup:**

   Copy the example environment file and configure your variables:

   ```bash
   cd frontend
   cp .env.example .env
   ```

   Edit the `.env` file with your actual values:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

   ⚠️ **Security Note**: Never commit your actual `.env` files to version control. The `.gitignore` file is configured to exclude these files.

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with Hooks
- **Vite** - Fast build tool and dev server
- **SCSS** - Advanced styling with variables and mixins
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Beautiful icon library
- **React Toastify** - Elegant notifications

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing

## 📱 Design Philosophy

MovieMowa features a modern design system with:

- **Glassmorphism UI**: Translucent elements with backdrop blur effects
- **Gradient Accents**: Beautiful orange-to-gold gradient theming
- **Smooth Animations**: CSS transitions and hover effects
- **Typography**: Clean Inter font for UI, elegant Playfair Display for headings
- **Color Palette**:
  - Primary: #ff6b35 (MovieMowa Orange)
  - Secondary: #4f46e5 (Deep Purple)
  - Accent: #06d6a0 (Mint Green)

## 🎯 Key Features

### For Users

- Browse latest movies with detailed information
- Search and filter movies by genre, date, rating
- Book tickets with interactive seat selection
- Manage bookings and favorites
- User profile management
- Responsive mobile experience

### For Admins

- Complete movie management (CRUD operations)
- Theatre and show management
- User booking analytics
- Content moderation tools
- Dashboard with key metrics

## 🔧 Database Schema

The application uses MongoDB with the following main collections:

- **Users**: User authentication and profile data
- **Movies**: Movie information, posters, metadata
- **Theatres**: Theatre locations and details
- **Shows**: Movie showtimes and availability
- **Bookings**: Ticket booking records
- **Reviews**: User movie reviews and ratings

## � Security & Environment Setup

### Environment Variables

This project uses environment variables to keep sensitive information secure. Never commit your actual `.env` files to version control.

**Required Environment Variables:**

**Backend (.env):**

- `MONGODB_CONNECTION_LINK` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (minimum 32 characters)
- `STRIPE_SECRET_KEY` - Your Stripe secret key for payments
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

**Frontend (.env):**

- `VITE_BACKEND_URL` - Backend API URL
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Setting Up Environment Variables

1. Copy the example files:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Fill in your actual values in the `.env` files
3. Ensure `.env` files are listed in `.gitignore` (already configured)

## �🚀 Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run start
```

### Environment Variables for Production

Ensure all environment variables are properly configured for your production environment.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Before Contributing

1. **Security Check**: Run the security check script before committing:

   ```bash
   # On Windows
   security-check.bat

   # On Linux/Mac
   chmod +x security-check.sh
   ./security-check.sh
   ```

2. **Environment Setup**: Ensure you have proper `.env` files configured
3. **Code Quality**: Follow the existing code style and structure
4. **Testing**: Test your changes thoroughly before submitting

### Git Best Practices

```bash
# Initial setup
git clone <repository-url>
cd MovieMowa

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit the .env files with your actual values

# Before committing
git add .
git status  # Review files being committed
git commit -m "Your commit message"

# Before pushing
./security-check.sh  # Run security check
git push origin main
```

⚠️ **Important**: Never commit `.env` files or any files containing secrets!

## 📞 Support

For support and queries, please reach out to our development team.

---

**MovieMowa** - Experience Cinema Like Never Before 🎬
