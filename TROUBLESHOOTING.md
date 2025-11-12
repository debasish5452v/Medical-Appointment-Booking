# Troubleshooting Guide

Common issues and their solutions for the Medical Appointment Booking System.

---

## 🔴 Backend Issues

### Issue: Backend server won't start

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

---

### Issue: MongoDB connection failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**

**1. MongoDB not running (Local):**
```powershell
# Start MongoDB service
net start MongoDB

# Or if installed without service:
mongod --dbpath="C:\data\db"
```

**2. Wrong connection string:**
```env
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/medical-appointments

# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

**3. MongoDB Atlas - IP not whitelisted:**
- Go to MongoDB Atlas dashboard
- Network Access → Add IP Address
- Add current IP or use 0.0.0.0/0 for development

---

### Issue: JWT errors

**Error:** `JsonWebTokenError: invalid token`

**Solutions:**

1. **Missing JWT_SECRET in .env:**
```env
JWT_SECRET=your_very_long_secret_key_here_make_it_random
```

2. **Token expired:**
- User needs to login again
- Check token expiry in routes/auth.js (default: 7 days)

3. **Invalid token format:**
- Ensure frontend sends: `Authorization: Bearer <token>`
- Check api.js authHeaders() function

---

### Issue: bcrypt errors on Windows

**Error:** `Error: Module did not self-register`

**Solution:**
```powershell
# Rebuild bcrypt
cd backend
npm rebuild bcrypt --build-from-source

# Or reinstall
npm uninstall bcrypt
npm install bcrypt
```

---

### Issue: Dependencies installation fails

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 🔵 Frontend Issues

### Issue: Frontend won't start

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```powershell
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or change port in vite.config.js
server: {
  port: 3001
}
```

---

### Issue: API calls failing

**Error:** `Failed to fetch` or `Network Error`

**Solutions:**

1. **Backend not running:**
```powershell
# Make sure backend is running
cd backend
npm run dev
```

2. **Wrong API URL:**
```env
# frontend/.env
VITE_API_BASE=http://localhost:5000/api
```

3. **CORS issues:**
- Backend already has CORS enabled
- Check server.js has: `app.use(cors())`

---

### Issue: React Router blank page

**Problem:** Page shows blank after navigation

**Solutions:**

1. **Check browser console** for errors

2. **Verify all imports:**
```javascript
// Each page should be properly imported in App.jsx
import Dashboard from './pages/Dashboard';
```

3. **Check protected routes:**
- Token might be expired
- Clear localStorage and login again

---

### Issue: Vite env variables not working

**Error:** `undefined` when accessing env variables

**Solution:**

1. **Prefix with VITE_:**
```env
# ❌ Wrong
API_BASE=http://localhost:5000/api

# ✅ Correct
VITE_API_BASE=http://localhost:5000/api
```

2. **Restart dev server** after changing .env

3. **Access correctly:**
```javascript
// ✅ Correct
const API_BASE = import.meta.env.VITE_API_BASE

// ❌ Wrong (This is for Node.js, not Vite)
const API_BASE = process.env.VITE_API_BASE
```

---

## 🟡 Database Issues

### Issue: Cannot seed database

**Error:** Running seedData.js fails

**Solutions:**

1. **Check MongoDB is running**

2. **Verify .env file exists in backend folder**

3. **Run from correct directory:**
```powershell
cd backend
node scripts/seedData.js
```

4. **Check connection string** in .env

---

### Issue: Duplicate key error

**Error:** `E11000 duplicate key error collection`

**Solution:**

1. **Email already exists:**
```javascript
// Use different email or delete existing user
```

2. **Reset database:**
```javascript
// In MongoDB shell or Compass
use medical-appointments
db.users.deleteMany({})
db.doctors.deleteMany({})
db.appointments.deleteMany({})
```

---

### Issue: Validation errors

**Error:** `Validation failed: field is required`

**Solution:**

Check that all required fields are provided:

**User:**
- name, email, password

**Doctor:**
- name, specialization, email, phone

**Appointment:**
- doctorId, date, timeSlot

---

## 🟢 Authentication Issues

### Issue: Cannot login

**Solutions:**

1. **Wrong credentials:**
- Check email is lowercase
- Verify password is correct
- Try registering new account

2. **User doesn't exist:**
```powershell
# Seed database to create test users
cd backend
node scripts/seedData.js

# Test credentials:
# Email: patient@example.com
# Password: patient123
```

3. **Token not being saved:**
- Check browser localStorage
- Open DevTools → Application → Local Storage
- Should see 'token' and 'user' keys

---

### Issue: Logged out unexpectedly

**Causes:**

1. **Token expired** (7 days default)
   - Login again

2. **localStorage cleared**
   - Browser cleared data
   - Login again

3. **Different browser/incognito**
   - Tokens are per-browser session

---

## 🟣 Appointment Issues

### Issue: Cannot book appointment

**Error:** `This time slot is already booked`

**Solution:**
- Choose different time slot
- Check if another appointment exists for that doctor/time

---

**Error:** `Cannot book appointments in the past`

**Solution:**
- Select a future date
- Check system date/time is correct

---

### Issue: Appointments not showing

**Solutions:**

1. **Check filter settings:**
- Try "All" filter instead of "Upcoming"

2. **Verify token is valid:**
```javascript
// In browser console
console.log(localStorage.getItem('token'))
```

3. **Check API response:**
- Open DevTools → Network tab
- Look for appointments request
- Check response data

---

## 🔧 Development Tools

### Useful Commands

**Check if ports are in use:**
```powershell
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 3000 (frontend)
netstat -ano | findstr :3000
```

**View MongoDB data:**
```powershell
# Using MongoDB Shell
mongosh
use medical-appointments
db.users.find().pretty()
db.doctors.find().pretty()
db.appointments.find().pretty()
```

**Clear localStorage (Browser Console):**
```javascript
localStorage.clear()
```

**View all env variables (Backend console):**
```javascript
console.log(process.env)
```

---

## 🐛 Debug Mode

### Enable verbose logging

**Backend (server.js):**
```javascript
// Add after app initialization
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend (api.js):**
```javascript
// Add to each API function
console.log('Request:', url, payload);
console.log('Response:', data);
```

---

## 📱 Common Error Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | No token or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email or time slot |
| 500 | Server Error | Backend error, check logs |

---

## 🆘 Still Having Issues?

### Checklist:

- [ ] MongoDB is running
- [ ] Backend .env file exists with correct values
- [ ] Frontend .env file exists with correct values
- [ ] Both backend and frontend are running
- [ ] No port conflicts
- [ ] All dependencies installed (`npm install`)
- [ ] Browser console checked for errors
- [ ] Backend terminal checked for errors

### Reset Everything:

```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Clear database
mongosh
use medical-appointments
db.dropDatabase()
exit

# Reseed
cd backend
node scripts/seedData.js
```

### Get Help:

1. Check error message in console
2. Search error on Stack Overflow
3. Check MongoDB/Node.js documentation
4. Review this guide again
5. Open issue on GitHub repository

---

## 📝 Prevention Tips

1. **Always start backend before frontend**
2. **Keep terminals open** to see errors
3. **Check .env files** are not committed to git
4. **Use consistent Node.js version** (v14+)
5. **Regular npm updates**: `npm update`
6. **Keep MongoDB running** during development
7. **Use meaningful commit messages**
8. **Test after each major change**

---

**Last Updated:** Based on MERN Stack Best Practices 2024
