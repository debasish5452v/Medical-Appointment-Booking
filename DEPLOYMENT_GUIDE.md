# 🚀 Deployment Guide - Render & Vercel

Complete guide to deploy the Medical Appointment Booking System to production.

---

## 📋 Prerequisites

Before deploying, you need:
- [ ] GitHub account
- [ ] Render account (https://render.com - Free tier available)
- [ ] Vercel account (https://vercel.com - Free tier available)
- [ ] MongoDB Atlas account (https://mongodb.com/cloud/atlas - Free tier available)

---

## Part 1: Setup MongoDB Atlas (Database) ☁️

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Verify your email

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose **FREE** M0 cluster
3. Select a cloud provider (AWS recommended)
4. Choose region closest to you
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Setup Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `medbook_user` (or your choice)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Setup Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, use specific IPs
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `medical-appointments`

Example:
```
mongodb+srv://medbook_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical-appointments?retryWrites=true&w=majority
```

**Save this connection string! You'll need it for deployment.**

---

## Part 2: Deploy Backend to Render 🔧

### Step 1: Push Code to GitHub
```bash
cd d:\Hackfest
git init
git add .
git commit -m "Initial commit - Medical Appointment Booking System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your project repository
4. Configure:
   - **Name**: `medical-appointment-api` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 4: Set Environment Variables
In the "Environment" section, add these variables:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A random secure string (min 32 characters) |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

**Generate JWT Secret:**
```bash
# Use this or similar random string
med_booking_prod_2025_secure_jwt_secret_random_key_xyz123abc456
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your API will be live at: `https://YOUR_SERVICE_NAME.onrender.com`

### Step 6: Test Backend
Visit: `https://YOUR_SERVICE_NAME.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Medical Appointment API running"
}
```

### Step 7: Seed Database (Optional)
Since you can't run the seed script directly on Render free tier, you have two options:

**Option A: Run locally against production DB**
1. Update local `backend/.env` with production MongoDB URI
2. Run: `node scripts/seedData.js`
3. Restore local `.env` afterward

**Option B: Use MongoDB Compass**
1. Download MongoDB Compass
2. Connect to your Atlas database
3. Manually create sample doctors and users

---

## Part 3: Deploy Frontend to Vercel 🎨

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 3: Deploy via Vercel Dashboard

#### Method 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Method 2: Vercel CLI
```bash
cd d:\Hackfest\frontend
vercel
# Follow prompts
```

### Step 4: Set Environment Variables
In Vercel project settings → Environment Variables:

| Key | Value |
|-----|-------|
| `VITE_API_BASE` | `https://YOUR_RENDER_SERVICE.onrender.com/api` |

**Important:** Replace `YOUR_RENDER_SERVICE` with your actual Render service URL!

### Step 5: Redeploy
After adding environment variables:
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

OR just push to GitHub (auto-deploys)

### Step 6: Test Frontend
1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Try signup/login
3. Browse doctors
4. Book an appointment

---

## Part 4: Update CORS (If Needed) 🔐

If you get CORS errors, update `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Then commit and push to trigger redeployment.

---

## 🎉 Deployment Complete!

### Your Live URLs:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-service.onrender.com/api`
- **Database**: MongoDB Atlas

### Test Your Production App:
1. ✅ Visit frontend URL
2. ✅ Sign up for new account
3. ✅ Login
4. ✅ Browse doctors
5. ✅ Book appointment
6. ✅ View dashboard

---

## 📊 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on Vercel
- [ ] CORS configured properly
- [ ] Can signup/login
- [ ] Can book appointments
- [ ] Database storing data

---

## 🔧 Troubleshooting

### Backend won't start
- Check Render logs
- Verify MongoDB connection string
- Ensure JWT_SECRET is set
- Check environment variables

### Frontend can't connect to backend
- Verify VITE_API_BASE is correct
- Check CORS settings
- Test backend health endpoint
- Check browser console for errors

### Database connection fails
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions
- Check database user password

### CORS errors
- Add Vercel URL to CORS whitelist
- Redeploy backend after CORS changes
- Clear browser cache

---

## 💰 Cost Breakdown

### Free Tier Limits:
- **MongoDB Atlas**: 512 MB storage, shared RAM
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: Unlimited personal projects, 100 GB bandwidth

### Total Monthly Cost: **$0** 🎉

---

## 🚀 Continuous Deployment

### Auto-Deploy on Git Push:

**Render:**
- Automatically deploys on push to `main` branch
- Check "Auto-Deploy" is enabled

**Vercel:**
- Automatically deploys on push to any branch
- Production: `main` branch
- Preview: Other branches

### Manual Deployment:
**Render**: Deployments → Manual Deploy → Deploy latest commit
**Vercel**: Deployments → Redeploy

---

## 📈 Monitoring

### Render:
- Go to your service dashboard
- Check "Logs" tab for errors
- Monitor "Metrics" for performance

### Vercel:
- Go to your project
- Check "Analytics" (if enabled)
- Review "Logs" for function execution

### MongoDB Atlas:
- Database → Metrics tab
- Monitor connections, operations
- Set up alerts

---

## 🔐 Security Best Practices (Production)

1. **MongoDB Atlas:**
   - Use specific IP addresses (not 0.0.0.0/0)
   - Strong database passwords
   - Enable MongoDB authentication

2. **Backend:**
   - Use strong JWT secrets (32+ chars)
   - Set NODE_ENV=production
   - Enable rate limiting
   - Add helmet.js for security headers

3. **Frontend:**
   - Never commit .env files
   - Use environment variables
   - Enable HTTPS only

4. **General:**
   - Keep dependencies updated
   - Monitor for vulnerabilities
   - Regular backups of database
   - Set up error tracking (Sentry)

---

## 📝 Maintenance

### Regular Tasks:
- [ ] Update npm packages monthly
- [ ] Check security vulnerabilities
- [ ] Monitor error logs
- [ ] Database backups
- [ ] Performance monitoring

### Scaling:
When you outgrow free tier:
- **Render**: Upgrade to paid plan ($7/mo)
- **MongoDB Atlas**: Upgrade cluster (starts $9/mo)
- **Vercel**: Pro plan if needed ($20/mo)

---

## 🎯 Next Steps

After deployment:
1. Add custom domain (optional)
2. Set up email notifications
3. Add payment processing
4. Implement analytics
5. Add more features!

---

**Congratulations! Your app is now live! 🎊**

Support: Check logs in Render/Vercel dashboards for any issues.
