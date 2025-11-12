# 🚀 Deployment Checklist

## Pre-Deployment Tasks

### 1. GitHub Repository Setup
- [ ] Initialize Git repository (if not already done)
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Medical Appointment Booking System"
  ```
- [ ] Create GitHub repository at https://github.com/new
- [ ] Add remote and push code
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
  git branch -M main
  git push -u origin main
  ```

### 2. MongoDB Atlas Setup
- [ ] Sign up at https://www.mongodb.com/cloud/atlas/register
- [ ] Create a free M0 cluster
- [ ] Set cluster name: `medical-appointments`
- [ ] Choose cloud provider (AWS recommended)
- [ ] Select region (closest to your users)
- [ ] Create database user with username and strong password
- [ ] Whitelist IP addresses:
  - [ ] Add `0.0.0.0/0` to allow all IPs (or specific IPs for better security)
- [ ] Get connection string (MongoDB URI)
- [ ] Save connection string securely (you'll need it for Render)

### 3. Environment Variables Preparation
- [ ] Generate secure JWT secret:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- [ ] Save the following for Render deployment:
  - `MONGO_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: The generated secret above
  - `PORT`: 5000 (Render will override this automatically)
  - `NODE_ENV`: production
  - `FRONTEND_URL`: (will be added after Vercel deployment)

- [ ] Save the following for Vercel deployment:
  - `VITE_API_BASE`: (will be your Render backend URL)

## Deployment Steps

### 4. Deploy Backend to Render
- [ ] Go to https://render.com and sign in with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Configure service:
  - **Name**: medical-appointment-api
  - **Root Directory**: backend
  - **Environment**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free
- [ ] Add environment variables (click "Advanced" → "Add Environment Variable"):
  - `MONGO_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: Your generated JWT secret
  - `NODE_ENV`: production
  - `FRONTEND_URL`: http://localhost:3000 (temporary, update after Vercel)
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Copy your Render backend URL (e.g., `https://medical-appointment-api.onrender.com`)
- [ ] Test health check: Visit `https://your-render-url.onrender.com/api/health`

### 5. Deploy Frontend to Vercel
- [ ] Go to https://vercel.com and sign in with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Configure project:
  - **Framework Preset**: Vite
  - **Root Directory**: frontend
  - **Build Command**: `npm run build`
  - **Output Directory**: dist
- [ ] Add environment variable:
  - **Name**: `VITE_API_BASE`
  - **Value**: Your Render backend URL (e.g., `https://medical-appointment-api.onrender.com`)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (2-3 minutes)
- [ ] Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### 6. Update CORS Configuration
- [ ] Go back to Render dashboard
- [ ] Click on your backend service
- [ ] Go to "Environment" tab
- [ ] Update `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Save and wait for automatic redeployment (2-3 minutes)

## Post-Deployment Testing

### 7. Verify Backend
- [ ] Visit `https://your-render-url.onrender.com/api/health`
  - Should return: `{"status":"ok","message":"Medical Appointment API running"}`
- [ ] Check Render logs for any errors
- [ ] Verify MongoDB connection in logs (should see "✅ Connected to MongoDB")

### 8. Verify Frontend
- [ ] Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Check browser console for any errors
- [ ] Verify API connection by trying to sign up:
  - [ ] Go to Signup page
  - [ ] Create a test account
  - [ ] Should successfully create account and redirect

### 9. Test Full Application Flow
- [ ] **Authentication**:
  - [ ] Sign up with new account
  - [ ] Log out
  - [ ] Log in with created account
- [ ] **Admin Functions** (use seeded admin: admin@example.com / admin123):
  - [ ] Log in as admin
  - [ ] View users list
  - [ ] View all appointments
  - [ ] Approve/reject appointments
- [ ] **Patient Functions**:
  - [ ] View available doctors
  - [ ] Book an appointment
  - [ ] View appointment history
  - [ ] Cancel an appointment

### 10. Seed Initial Data (Optional)
If you want to add sample doctors and admin user:
- [ ] SSH into Render or use Render Shell
- [ ] Run seed command:
  ```bash
  node seedData.js
  ```
- [ ] Verify seed data:
  - Admin: admin@example.com / admin123
  - Doctors should appear in Doctors page

## Monitoring & Maintenance

### 11. Set Up Monitoring
- [ ] Check Render logs regularly for errors
- [ ] Check Vercel deployment logs
- [ ] Monitor MongoDB Atlas performance metrics
- [ ] Set up alerts for downtime (optional)

### 12. Custom Domain (Optional)
- [ ] **Vercel**: Add custom domain in project settings
- [ ] **Render**: Add custom domain in service settings
- [ ] Update DNS records as instructed
- [ ] Update CORS settings with new domain

## Troubleshooting

### Common Issues After Deployment

#### Backend not connecting to MongoDB
- ✅ Verify MongoDB Atlas connection string is correct
- ✅ Check database user credentials
- ✅ Ensure IP whitelist includes `0.0.0.0/0` or your Render IPs
- ✅ Check Render logs for connection errors

#### Frontend showing CORS errors
- ✅ Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- ✅ Check no trailing slash in URLs
- ✅ Ensure backend has redeployed after CORS update
- ✅ Clear browser cache

#### API calls failing from frontend
- ✅ Verify `VITE_API_BASE` in Vercel matches Render URL
- ✅ Check no trailing slash in API URL
- ✅ Verify backend health check endpoint works
- ✅ Check browser console and network tab for errors

#### Render service sleeping (free tier)
- ✅ First request after 15 minutes of inactivity takes longer (cold start)
- ✅ Consider using a service like UptimeRobot to ping every 14 minutes
- ✅ Upgrade to paid plan for always-on service

## Security Best Practices

### Post-Deployment Security
- [ ] Never commit `.env` files to Git
- [ ] Use strong JWT secret (at least 64 characters)
- [ ] Use strong MongoDB password (include special characters)
- [ ] Restrict MongoDB IP whitelist if possible
- [ ] Enable 2FA on GitHub, Render, Vercel, and MongoDB Atlas
- [ ] Regularly update dependencies:
  ```bash
  npm audit fix
  ```
- [ ] Monitor for security vulnerabilities
- [ ] Set up HTTPS (automatic with Vercel and Render)

## Cost Breakdown (Free Tier)

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| MongoDB Atlas | M0 Free | $0 | 512 MB storage, shared CPU |
| Render | Free | $0 | Sleeps after 15min inactivity, 750 hrs/month |
| Vercel | Hobby | $0 | 100 GB bandwidth, unlimited deployments |
| **Total** | | **$0/month** | Perfect for personal projects |

## Upgrade Paths (Optional)

When your app grows:
- **MongoDB Atlas**: Upgrade to M10 ($57/month) for dedicated cluster
- **Render**: Upgrade to Starter ($7/month) for always-on service
- **Vercel**: Upgrade to Pro ($20/month) for team features and more bandwidth

## Helpful Commands

### Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### View Deployed Logs
```bash
# Render: Go to dashboard → Your service → Logs tab
# Vercel: Go to dashboard → Your project → Deployments → Click deployment → Runtime Logs
```

### Redeploy
```bash
# Automatic redeployment when you push to GitHub:
git add .
git commit -m "Your changes"
git push origin main

# Both Render and Vercel will automatically redeploy
```

---

## 🎉 Deployment Complete!

Once all checkboxes are complete, your Medical Appointment Booking System is live!

**Backend URL**: `https://your-render-url.onrender.com`  
**Frontend URL**: `https://your-app.vercel.app`  
**Admin Login**: admin@example.com / admin123 (after seeding)

Share your live URLs with others and start booking appointments! 🏥
