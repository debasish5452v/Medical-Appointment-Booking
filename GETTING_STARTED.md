# 🎯 GETTING STARTED - Your First Steps

Welcome to the Medical Appointment Booking System! This guide will get you from zero to running app in under 10 minutes.

---

## 🚦 Prerequisites Check

Before starting, verify you have:

### Required Software
- [ ] **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
  ```powershell
  node --version  # Should show v14.x.x or higher
  ```

- [ ] **MongoDB** - Choose ONE:
  - Option A: Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - Option B: MongoDB Atlas (Free Cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
  
- [ ] **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### Optional but Helpful
- [ ] MongoDB Compass (Database GUI)
- [ ] Postman or Thunder Client (API testing)
- [ ] Git (Version control)

---

## 📋 Setup Checklist

Follow these steps in order:

### Step 1: Navigate to Project
```powershell
cd d:\Hackfest
```

### Step 2: Backend Setup ⚙️

```powershell
# Go to backend folder
cd backend

# Install dependencies (takes 1-2 minutes)
npm install

# Create environment file
copy .env.example .env

# Open .env and edit these lines:
# MONGO_URI=mongodb://localhost:27017/medical-appointments
# (or your MongoDB Atlas connection string)
# JWT_SECRET=your_random_secret_key_make_it_long_and_random
# PORT=5000
```

**✅ Checkpoint**: You should see `node_modules` folder and `.env` file in backend/

### Step 3: Frontend Setup 🎨

Open a NEW terminal (keep backend terminal open):

```powershell
# Go to frontend folder (from Hackfest root)
cd frontend

# Install dependencies (takes 1-2 minutes)
npm install

# Create environment file
copy .env.example .env

# Default settings should work:
# VITE_API_BASE=http://localhost:5000/api
```

**✅ Checkpoint**: You should see `node_modules` folder and `.env` file in frontend/

### Step 4: Start MongoDB 🗄️

**Option A - Local MongoDB:**
```powershell
# Start MongoDB service
net start MongoDB

# Or if not running as service:
# mongod --dbpath="C:\data\db"
```

**Option B - MongoDB Atlas:**
- Already running in cloud ✓
- Just use your connection string in backend/.env

**✅ Checkpoint**: MongoDB should be running (check Task Manager or MongoDB Compass)

### Step 5: Start Backend 🚀

In backend terminal:
```powershell
# Make sure you're in backend folder
npm run dev

# You should see:
# ✅ Connected to MongoDB
# 🚀 Server running on port 5000
```

**✅ Checkpoint**: Backend running on http://localhost:5000

### Step 6: Start Frontend 🎨

In frontend terminal:
```powershell
# Make sure you're in frontend folder
npm run dev

# Browser should open automatically
# Or visit: http://localhost:3000
```

**✅ Checkpoint**: Frontend running on http://localhost:3000

### Step 7: Seed Database (Optional but Recommended) 🌱

Open a THIRD terminal:
```powershell
cd backend
node scripts/seedData.js

# You should see:
# ✅ Created 6 doctors
# ✅ Created admin user
# ✅ Created patient user
```

**✅ Checkpoint**: Database has sample data

---

## 🎉 You're Ready!

### Test Your Installation

1. **Open Browser**: http://localhost:3000

2. **Try Login** with test account:
   - Email: `patient@example.com`
   - Password: `patient123`

3. **Explore the App**:
   - ✅ View Dashboard
   - ✅ Browse Doctors
   - ✅ Book an Appointment
   - ✅ View Appointments

---

## 🎯 Quick Tour

### What Each Terminal Does

```
Terminal 1 (Backend):
├─ Runs Express API server
├─ Connects to MongoDB
├─ Handles authentication
└─ Processes API requests

Terminal 2 (Frontend):
├─ Runs React development server
├─ Serves the web interface
├─ Hot reloads on file changes
└─ Compiles React components

Terminal 3 (Optional):
└─ For running commands like seeding
```

### What Each Folder Does

```
d:\Hackfest\
├─ backend\          → API server (Node.js + Express)
├─ frontend\         → Web interface (React + Vite)
├─ README.md         → Main documentation
├─ SETUP_GUIDE.md    → This guide!
└─ Other docs        → Additional resources
```

---

## 🎓 Your First Tasks

Now that everything is running, try these:

### 1. Register a New Account (5 minutes)
1. Click "Sign Up" on homepage
2. Fill in your details
3. Create account
4. You'll auto-login to dashboard

### 2. Browse Doctors (2 minutes)
1. Click "Doctors" in navigation
2. Try the search box
3. Filter by specialization
4. View doctor profiles

### 3. Book Your First Appointment (5 minutes)
1. Click "Book Appointment" on a doctor card
2. Select a date (today or future)
3. Choose a time slot
4. Add reason (optional)
5. Submit booking
6. See it in your dashboard!

### 4. Manage Appointments (3 minutes)
1. Go to "My Appointments"
2. View all your bookings
3. Filter by status
4. Try canceling one

### 5. Test Admin Features (3 minutes)
1. Logout
2. Login as admin:
   - Email: `admin@medbook.com`
   - Password: `admin123`
3. View all appointments
4. Manage doctors (future feature)

---

## 🐛 Common Issues

### Issue: "Cannot connect to MongoDB"
**Fix:**
```powershell
# Check if MongoDB is running
net start MongoDB

# Or check connection string in backend/.env
```

### Issue: "Port 5000 already in use"
**Fix:**
```powershell
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### Issue: "Cannot find module"
**Fix:**
```powershell
# Reinstall dependencies
cd backend  # or frontend
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Frontend can't reach backend
**Fix:**
```powershell
# Make sure backend is running first
# Check frontend/.env has correct API URL
VITE_API_BASE=http://localhost:5000/api
```

**More help?** See `TROUBLESHOOTING.md` for detailed solutions.

---

## 📚 Learning Resources

### Understanding the Code

**Start here in order:**

1. **Backend Flow**:
   ```
   backend/server.js          → Entry point, connects everything
   backend/routes/auth.js     → How login/signup works
   backend/models/User.js     → Database structure for users
   backend/middleware/auth.js → How authentication works
   ```

2. **Frontend Flow**:
   ```
   frontend/src/main.jsx      → Entry point
   frontend/src/App.jsx       → Routing setup
   frontend/src/api.js        → How we call backend
   frontend/src/pages/        → Each page of the app
   ```

3. **Key Concepts**:
   - **JWT**: How we keep users logged in
   - **REST API**: How frontend and backend talk
   - **Mongoose**: How we structure database data
   - **React Router**: How pages change without reload

### Recommended Reading Order

1. ✅ `PROJECT_COMPLETE.md` - Overview (you are here!)
2. ✅ `README.md` - Features and architecture
3. ✅ `API_DOCUMENTATION.md` - How the API works
4. ✅ `PROJECT_STRUCTURE.md` - Code organization
5. ✅ `FEATURES.md` - What's included
6. ✅ `TROUBLESHOOTING.md` - When things go wrong

---

## 🔧 Development Workflow

### Daily Development

```powershell
# Morning: Start your servers

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend  
npm run dev

# Now code! Files auto-reload on save
```

### Making Changes

**Backend (API) Changes:**
1. Edit files in `backend/routes/` or `backend/models/`
2. Server auto-restarts (nodemon)
3. Test in browser or Postman

**Frontend (UI) Changes:**
1. Edit files in `frontend/src/pages/` or `frontend/src/components/`
2. Browser auto-refreshes (Vite HMR)
3. Changes appear instantly

### Testing Changes

1. **Browser DevTools**: F12 → Console tab for errors
2. **Network Tab**: See API requests and responses
3. **MongoDB Compass**: View database records
4. **Backend Terminal**: See API logs

---

## 🎯 Next Steps After Setup

### Beginner Level
- [ ] Read through all documentation
- [ ] Test all features as a user
- [ ] Try the admin account
- [ ] Browse the code structure
- [ ] Make a small CSS change

### Intermediate Level
- [ ] Add a new field to user profile
- [ ] Create a new API endpoint
- [ ] Add a new page to frontend
- [ ] Customize the color scheme
- [ ] Add email notifications

### Advanced Level
- [ ] Add payment integration
- [ ] Implement real-time features
- [ ] Add video consultation
- [ ] Create mobile app version
- [ ] Deploy to production

---

## 💡 Pro Tips

### Productivity
- ✅ Keep terminals visible at all times
- ✅ Use VS Code split view for backend/frontend
- ✅ Install React Developer Tools extension
- ✅ Use MongoDB Compass to visualize data
- ✅ Bookmark http://localhost:3000 and http://localhost:5000

### Best Practices
- ✅ Always start backend before frontend
- ✅ Check both terminals for errors
- ✅ Use meaningful commit messages
- ✅ Test before committing code
- ✅ Read error messages carefully

### Keyboard Shortcuts (VS Code)
- `Ctrl + ~` - Toggle terminal
- `Ctrl + B` - Toggle sidebar
- `Ctrl + P` - Quick file open
- `Ctrl + F` - Find in file
- `Ctrl + Shift + F` - Find in all files

---

## 🆘 Getting Help

### Self-Help (Try First)
1. Check terminal for error messages
2. Read `TROUBLESHOOTING.md`
3. Check browser console (F12)
4. Verify .env files are set up
5. Ensure MongoDB is running

### External Resources
1. Search error on Stack Overflow
2. Check MongoDB documentation
3. Review React documentation
4. Ask in coding forums

### Last Resort
1. Reset everything (see TROUBLESHOOTING.md)
2. Reinstall dependencies
3. Check system requirements
4. Create GitHub issue

---

## ✅ Success Indicators

You know setup is complete when:

- [✓] No errors in backend terminal
- [✓] No errors in frontend terminal
- [✓] http://localhost:3000 loads
- [✓] You can login with test account
- [✓] You can see doctors list
- [✓] You can book an appointment
- [✓] Dashboard shows your data

---

## 🎊 Congratulations!

You now have a **fully functional** medical appointment booking system running locally!

### What You Can Do Now:
- 👥 Register users and login
- 👨‍⚕️ Browse and search doctors
- 📅 Book appointments
- 📋 View appointment history
- ❌ Cancel appointments
- 👑 Use admin features

### What's Next:
- 📖 Read the full documentation
- 🎨 Customize the design
- ✨ Add new features
- 🚀 Deploy to production
- 💻 Learn from the code

---

## 📞 Quick Reference

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

### Test Accounts
- Patient: `patient@example.com` / `patient123`
- Admin: `admin@medbook.com` / `admin123`

### Commands
```powershell
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Seed database
cd backend && node scripts/seedData.js

# Install all dependencies
npm run install-all
```

### Important Files
- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration
- `backend/server.js` - Backend entry point
- `frontend/src/main.jsx` - Frontend entry point

---

**🎉 Happy Coding!**

You're all set to start developing your medical appointment booking system. If you run into any issues, check `TROUBLESHOOTING.md` or the other documentation files.

**Remember**: The best way to learn is by doing. Start making small changes and see what happens!

---

**Last Updated**: November 2024
**Project Version**: 1.0.0
**Status**: ✅ Production Ready Foundation
