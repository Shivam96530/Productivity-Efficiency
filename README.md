# 📊 Deriving Productivity Efficiency using MERN Stack

A complete, production-ready MERN Stack application for tracking productivity efficiency with modern UI/UX, dark mode, and comprehensive analytics.

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for API calls
- **Context API** for state management (Auth + Theme)

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** (or local MongoDB)
- **Mongoose** for ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📁 Project Structure

```
productivity-mern-stack/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── ProductivityRecord.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── productivity.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PasswordInput.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── TimeTracking.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Goals.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Step 1: Install Dependencies

**Option A: Install all at once (Recommended)**
```bash
npm run install-all
```

**Option B: Install manually**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Backend

1. Navigate to `backend` folder
2. Create a `.env` file (copy from `.env.example`):
```bash
cd backend
cp .env.example .env
```

3. Edit `.env` file with your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/productivity?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**For MongoDB Atlas:**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace `<password>` with your database password
- Replace `<dbname>` with `productivity` (or your preferred name)

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/productivity
```

### Step 3: Run the Application

**Option A: Run both frontend and backend together (Recommended)**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 - Backend:
```bash
npm run server
# or
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run client
# or
cd frontend
npm run dev
```

### Step 4: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📱 Features

### ✅ Authentication
- User signup and login with JWT
- Password hashing with bcrypt
- Protected routes
- Auth state persistence
- Password show/hide toggle (👁️ eye icon)

### 🌙 Dark/Light Mode
- Global theme toggle in navbar
- Theme preference saved in localStorage
- Premium dark mode design
- Smooth transitions

### 📊 Dashboard
- Productivity efficiency percentage
- Total and completed tasks
- Time utilization metrics
- Task status distribution
- Priority breakdown
- Quick actions

### 🗂️ Task Management
- Create, read, update, delete tasks
- Task status (pending, in-progress, completed)
- Priority levels (low, medium, high)
- Planned vs actual time tracking
- Due dates
- Beautiful card-based UI

### ⏱️ Time Tracking
- Start/stop time tracking for tasks
- Real-time time updates
- Visual progress indicators
- Time comparison (planned vs actual)

### 📈 Analytics & Reports
- Daily efficiency metrics
- Weekly efficiency metrics
- Overall efficiency calculation
- Time utilization charts
- Task completion statistics
- Efficiency formula explanation

### 🎯 Goals & Performance
- Set efficiency targets
- Progress tracking
- Performance insights
- Tips for improvement
- Achievement indicators

### 👤 Profile & Settings
- Update profile information
- Theme preferences
- Account information
- Logout functionality

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Productivity
- `GET /api/productivity/daily` - Daily efficiency (protected)
- `GET /api/productivity/weekly` - Weekly efficiency (protected)
- `GET /api/productivity/overall` - Overall efficiency (protected)
- `GET /api/productivity/stats` - Comprehensive stats (protected)

### User
- `GET /api/user/profile` - Get profile (protected)
- `PUT /api/user/profile` - Update profile (protected)
- `PUT /api/user/theme` - Update theme (protected)

## 📐 Productivity Efficiency Formula

```
Efficiency (%) = (Completed Actual Time / Total Planned Time) × 100
```

Where:
- **Completed Actual Time:** Sum of actual time spent on completed tasks
- **Total Planned Time:** Sum of planned time for all tasks

## 🎨 UI/UX Features

- Modern SaaS-style design
- Premium Tailwind CSS styling
- Glassmorphism effects
- Smooth animations and transitions
- Fully responsive design
- Professional color scheme
- Intuitive navigation
- Toast notifications
- Loading states
- Error handling

## 🚀 Production Build

Build the frontend for production:
```bash
npm run build
```

The built files will be in `frontend/dist/`

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure your database password is correct

### Port Already in Use
- Change PORT in backend/.env
- Update proxy in frontend/vite.config.js

### CORS Errors
- Backend CORS is already configured
- Ensure backend is running before frontend

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET in backend/.env
- Verify token in browser DevTools

## 📚 Additional Notes

- All routes except `/`, `/login`, and `/signup` are protected
- Theme preference syncs with backend
- Password minimum length: 6 characters
- Time is tracked in minutes
- Efficiency is calculated automatically

## 🎓 Perfect for

- College project submission
- Portfolio showcase
- Learning MERN stack
- Productivity tracking
- Demo and viva presentations

## 📄 License

ISC

---

**Built with ❤️ using MERN Stack**
