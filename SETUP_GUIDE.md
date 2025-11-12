# Medical Appointment Booking - Quick Setup Guide

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Code editor (VS Code recommended)

## Step-by-Step Setup

### 1️⃣ Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env file with:
# - Your MongoDB connection string
# - A secure JWT secret (random string)
```

**Start Backend:**
```bash
npm run dev
```
✅ Backend should be running on http://localhost:5000

### 2️⃣ Frontend Setup (3 minutes)

Open a NEW terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# The default settings should work
```

**Start Frontend:**
```bash
npm run dev
```
✅ Frontend should open automatically at http://localhost:3000

### 3️⃣ Seed Database (Optional - 1 minute)

Open a NEW terminal window:

```bash
cd backend
node scripts/seedData.js
```

This creates:
- 6 sample doctors
- Admin user: `admin@medbook.com` / `admin123`
- Patient user: `patient@example.com` / `patient123`

### 4️⃣ Test the Application

1. Open http://localhost:3000
2. Click "Sign Up" to create a new account OR use test credentials
3. Browse doctors
4. Book an appointment
5. View your dashboard

## Common Issues & Solutions

### Backend won't start
- Check if MongoDB is running
- Verify MONGO_URI in .env file
- Make sure port 5000 is not in use

### Frontend won't start
- Check if backend is running first
- Verify VITE_API_BASE in .env
- Make sure port 3000 is not in use

### Can't connect to database
- Local MongoDB: Ensure MongoDB service is running
- Atlas: Check connection string and IP whitelist

## MongoDB Options

### Option A: Local MongoDB
```
MONGO_URI=mongodb://localhost:27017/medical-appointments
```

### Option B: MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to .env file

## Development Workflow

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Optional commands
cd backend
node scripts/seedData.js  # Seed data
```

## Default Ports
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## Next Steps
1. ✅ Start both backend and frontend
2. ✅ Create an account or use test credentials
3. ✅ Explore the application
4. ✅ Book your first appointment!

## Need Help?
- Check README.md for detailed documentation
- Verify all dependencies are installed
- Make sure MongoDB is accessible
- Check console for error messages

---

**Quick Commands Reference:**

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Seed data (new terminal)
cd backend && node scripts/seedData.js
```

🎉 **You're ready to go!**
