# Medical Appointment Booking System 🏥

A modern, full-stack web application for booking and managing medical appointments built with the MERN stack (MongoDB, Express.js, React, Node.js).

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## � Overview

This is a comprehensive medical appointment booking system that allows patients to:
- Browse available doctors by specialization
- Book appointments with real-time availability
- Manage their appointment history
- Cancel appointments when needed

And allows admins to:
- Manage all users and doctors
- Approve or reject appointment requests
- View system-wide statistics

**Live Demo**: [Coming Soon - Deploy following our guides!]

---

## ✨ Features

### For Patients
- 🔐 **Secure Authentication**: JWT-based signup and login
- 👨‍⚕️ **Doctor Discovery**: Browse doctors by specialization (Cardiology, Dermatology, etc.)
- 📅 **Smart Booking**: Book appointments with available time slots
- 📋 **History Tracking**: View all past and upcoming appointments
- ❌ **Easy Cancellation**: Cancel appointments with one click
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### For Admins
- 👥 **User Management**: View and manage all registered users
- 🩺 **Doctor Management**: Add, edit, or remove doctors
- 📊 **Appointment Oversight**: View and manage all appointments
- ✅ **Approval System**: Approve or reject appointment requests
- 📈 **System Statistics**: Track usage and performance

### Technical Features
- ⚡ **Fast & Modern**: Built with Vite for blazing-fast development
- 🔒 **Secure**: Password hashing with bcrypt, JWT authentication
- ✅ **Validated**: Input validation on both frontend and backend
- 🎨 **Beautiful UI**: Modern, clean interface with smooth animations
- 📱 **Mobile-First**: Responsive design that works everywhere
- 🔄 **RESTful API**: Clean, well-documented API architecture

---

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js v4.18
- **Database**: MongoDB with Mongoose ODM v8.0
- **Authentication**: JWT (jsonwebtoken v9.0)
- **Security**: bcrypt v5.1 for password hashing
- **Validation**: express-validator v7.0
- **Development**: nodemon v3.0 for auto-restart

### Frontend
- **Library**: React 18.2
- **Build Tool**: Vite 5.0 (ESM, HMR)
- **Routing**: React Router v6.20
- **Date Handling**: date-fns v3.0
- **Styling**: Modern CSS3 with CSS Variables
- **HTTP Client**: Fetch API with axios-like wrapper

### Database Schema
- **Users**: Authentication and profile data
- **Doctors**: Medical professionals with specializations
- **Appointments**: Booking records with status tracking

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js** v14 or higher ([Download](https://nodejs.org/))
- ✅ **npm** (comes with Node.js)
- ✅ **MongoDB** (local installation OR MongoDB Atlas account)
- ✅ **Git** (for version control)
- ✅ **Code Editor** (VS Code recommended)

---

## 🛠️ Quick Start (Local Development)

### Option A: With MongoDB Atlas (Recommended - No Local DB Needed)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Hackfest
   ```

2. **Setup MongoDB Atlas** (5 minutes)
   - Sign up at https://www.mongodb.com/cloud/atlas/register
   - Create free M0 cluster
   - Get connection string
   - See `DEPLOYMENT_GUIDE.md` Part 1 for details

3. **Configure Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your MongoDB Atlas URI
   ```

4. **Configure Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # VITE_API_BASE is already set to http://localhost:5000
   ```

5. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

### Option B: With Local MongoDB

1-2. Same as Option A

3. **Install MongoDB** locally
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS
   - Start MongoDB service

4-6. Same as Option A (the default .env uses localhost MongoDB)

---

## 🚀 Deployment (Production)

### Deploy to Render + Vercel (FREE - Recommended)

**Total Time**: ~45 minutes | **Cost**: $0/month

We've created comprehensive guides for deployment:

1. **📖 Start Here**: [`DEPLOYMENT_SUMMARY.md`](DEPLOYMENT_SUMMARY.md)
   - Quick overview of the entire deployment process
   - Time estimates and cost breakdown
   - Links to all deployment resources

2. **📦 First**: [`GITHUB_SETUP.md`](GITHUB_SETUP.md)
   - Push your code to GitHub (required for Render and Vercel)
   - Git configuration and troubleshooting
   - Security best practices

3. **✅ Then**: [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md)
   - Interactive checklist with all deployment tasks
   - Step-by-step verification
   - Testing procedures

4. **📚 Reference**: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)
   - Comprehensive 400+ line deployment guide
   - MongoDB Atlas setup
   - Render backend deployment
   - Vercel frontend deployment
   - Environment variables
   - Troubleshooting

### Deployment Architecture

```
┌─────────────────┐
│   MongoDB Atlas │  ← Free M0 Cluster (512MB)
│   (Database)    │
└────────┬────────┘
         │
         │
┌────────▼────────┐
│     Render      │  ← Backend API (Node.js + Express)
│   (Backend)     │     Free Tier (sleeps after 15min)
└────────┬────────┘
         │
         │ REST API
         │
┌────────▼────────┐
│     Vercel      │  ← Frontend (React + Vite)
│   (Frontend)    │     Free Tier (100GB bandwidth)
└─────────────────┘
```

### Quick Deployment Steps

1. **MongoDB Atlas** (10 min)
   - Create free cluster
   - Get connection string

2. **Push to GitHub** (5 min)
   - Initialize Git repo
   - Push code to GitHub

3. **Deploy Backend to Render** (10 min)
   - Connect GitHub repo
   - Add environment variables
   - Deploy

4. **Deploy Frontend to Vercel** (5 min)
   - Import GitHub repo
   - Add API URL
   - Deploy

5. **Update CORS** (2 min)
   - Add Vercel URL to Render env

6. **Test** (10 min)
   - Verify all functionality

**See [`DEPLOYMENT_SUMMARY.md`](DEPLOYMENT_SUMMARY.md) for complete instructions!**

---

---

## 📚 Documentation

We've created comprehensive documentation for every aspect of this project:

| Document | Description | When to Use |
|----------|-------------|-------------|
| [`README.md`](README.md) | Main project documentation | **Start here** - Overview and quick start |
| [`GETTING_STARTED.md`](GETTING_STARTED.md) | Beginner-friendly guide | New to MERN? Read this first |
| [`DEPLOYMENT_SUMMARY.md`](DEPLOYMENT_SUMMARY.md) | Deployment overview | **Ready to deploy?** Start here |
| [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) | Complete deployment guide | Detailed step-by-step instructions |
| [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) | Interactive checklist | Track your deployment progress |
| [`GITHUB_SETUP.md`](GITHUB_SETUP.md) | Git and GitHub guide | Push code to GitHub |
| [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) | API endpoints reference | Working with the backend API |
| [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) | Code organization | Understanding the codebase |
| [`FEATURES.md`](FEATURES.md) | Feature specifications | Detailed feature descriptions |
| [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) | Common issues & solutions | Having problems? Check here |
| [`SETUP_GUIDE.md`](SETUP_GUIDE.md) | Quick setup reference | Quick command reference |

---


Hackfest/
## 📁 Project Structure

```
medical-appointment-system/
├── backend/                    # Node.js + Express API
│   ├── models/                 # Mongoose models
│   │   ├── User.js            # User authentication & profile
│   │   ├── Doctor.js          # Doctor information
│   │   └── Appointment.js     # Appointment bookings
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── users.js           # User management
│   │   ├── doctors.js         # Doctor operations
│   │   └── appointments.js    # Appointment management
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js            # JWT verification
│   │   └── adminAuth.js       # Admin authorization
│   ├── server.js              # Express app entry point
│   ├── seedData.js            # Database seeding script
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   └── .gitignore             # Git ignore rules
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   ├── AppointmentCard.jsx  # Appointment display
│   │   │   ├── DoctorCard.jsx       # Doctor display
│   │   │   └── Loading.jsx          # Loading spinner
│   │   ├── pages/             # Route pages
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Signup.jsx     # Registration page
│   │   │   ├── Dashboard.jsx  # User dashboard
│   │   │   ├── Doctors.jsx    # Doctor listing
│   │   │   ├── BookAppointment.jsx  # Booking form
│   │   │   └── AppointmentHistory.jsx  # User appointments
│   │   ├── api.js             # API integration layer
│   │   ├── App.jsx            # Main app component with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   └── .gitignore             # Git ignore rules
│
├── .gitignore                 # Root git ignore
├── render.yaml                # Render deployment config
├── vercel.json                # Vercel deployment config
│
└── Documentation Files:
    ├── README.md              # This file - Main documentation
    ├── GETTING_STARTED.md     # Beginner's guide
    ├── DEPLOYMENT_SUMMARY.md  # Deployment overview
    ├── DEPLOYMENT_GUIDE.md    # Complete deployment guide
    ├── DEPLOYMENT_CHECKLIST.md  # Deployment checklist
    ├── GITHUB_SETUP.md        # Git & GitHub guide
    ├── API_DOCUMENTATION.md   # API reference
    ├── PROJECT_STRUCTURE.md   # Architecture details
    ├── FEATURES.md            # Feature specifications
    ├── TROUBLESHOOTING.md     # Common issues
    └── SETUP_GUIDE.md         # Quick setup reference
```

**See [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) for detailed architecture information.**

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |

### Users (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/me` | Get current user profile | Yes |
| GET | `/` | Get all users (admin) | Yes (Admin) |

### Doctors (`/api/doctors`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all active doctors | No |
| GET | `/:id` | Get doctor by ID | No |
| POST | `/` | Create new doctor | Yes (Admin) |
| PUT | `/:id` | Update doctor | Yes (Admin) |
| DELETE | `/:id` | Deactivate doctor | Yes (Admin) |

### Appointments (`/api/appointments`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user's appointments | Yes |
| GET | `/:id` | Get appointment by ID | Yes |
| POST | `/` | Create appointment | Yes |
| PUT | `/:id/cancel` | Cancel appointment | Yes |
| GET | `/admin/appointments` | Get all appointments | Yes (Admin) |
| PUT | `/:id/status` | Update appointment status | Yes (Admin) |

**See [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for complete API reference with request/response examples.**

---

## 🔒 Security & Privacy

> **⚠️ Important**: This is a **starter/demo application** and is **not production-ready** for handling Protected Health Information (PHI) or meeting HIPAA/GDPR compliance requirements.

### Current Security Features
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based authentication (7-day expiration)
- ✅ Protected routes and middleware
- ✅ Input validation on all endpoints
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ SQL injection prevention (MongoDB + Mongoose)
- ✅ XSS protection (React escaping + input validation)

### For Production Medical Applications, You Must Add:
- 🔐 **Encryption at rest** for all sensitive data
- 📝 **Comprehensive audit logging** of all data access
- 🔒 **HTTPS/TLS** everywhere (Render/Vercel provide this)
- ⏱️ **Rate limiting** to prevent abuse
- 🔑 **Multi-factor authentication (2FA)**
- 📋 **Data retention policies**
- 🚨 **Breach notification procedures**
- ⚖️ **Legal compliance review** (HIPAA, GDPR, etc.)
- 🔍 **Regular security audits**
- 💾 **Encrypted backups**

**Consult with legal and compliance experts before handling real medical data!**

---

## 🎨 Features Overview

### Patient Features
- 🔐 **Secure Authentication**: Email/password signup and login with JWT
- 🏠 **Personal Dashboard**: View upcoming appointments at a glance
- 👨‍⚕️ **Doctor Discovery**: Browse doctors by specialization (8 specializations available)
- 📅 **Smart Booking**: Select available time slots with date/time picker
- 📋 **Appointment History**: View all past and upcoming appointments
- ❌ **Easy Cancellation**: Cancel appointments with confirmation dialog
- 📱 **Responsive Design**: Seamless experience on all devices

### Admin Features
- 👥 **User Management**: View all registered users with details
- 🩺 **Doctor Management**: Add, edit, or deactivate doctors
- 📊 **Appointment Oversight**: View all appointments across the system
- ✅ **Approval Workflow**: Approve or reject appointment requests
- 📈 **System Monitoring**: Track user activity and appointments

### Technical Features
- ⚡ **Fast Development**: Vite HMR for instant feedback
- 🔒 **Secure by Default**: JWT + bcrypt + validation
- ✅ **Input Validation**: Client and server-side validation
- 🎨 **Modern UI**: Clean interface with CSS animations
- 📱 **Mobile-First**: Responsive grid and flexbox layouts
- 🔄 **RESTful API**: Clean, predictable API architecture
- 📝 **Well-Documented**: Comprehensive docs for every feature

**See [`FEATURES.md`](FEATURES.md) for detailed feature specifications.**

---

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data
```

#### Frontend
```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### Database Seeding

To add sample data (admin user + doctors):

```bash
cd backend
node seedData.js
```

This creates:
- **Admin User**: admin@example.com / admin123
- **3 Sample Doctors**: One each for Cardiology, Dermatology, and Pediatrics

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User can sign up with valid email/password
- [ ] User can log in with correct credentials
- [ ] User cannot access protected routes without login
- [ ] User can view all doctors
- [ ] User can filter doctors by specialization
- [ ] User can book an appointment
- [ ] User can view appointment history
- [ ] User can cancel an appointment
- [ ] Admin can log in
- [ ] Admin can view all users
- [ ] Admin can view all appointments
- [ ] Admin can approve/reject appointments

### API Testing

Use tools like Postman or Thunder Client:

1. **Register**: POST `/api/auth/register`
2. **Login**: POST `/api/auth/login` (get JWT token)
3. **Get Doctors**: GET `/api/doctors` (no auth needed)
4. **Create Appointment**: POST `/api/appointments` (with JWT header)

**See [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for request/response examples.**

---

## � Troubleshooting

### Common Issues

#### Backend won't start
- ✅ Check MongoDB is running (or Atlas connection string is correct)
- ✅ Verify `.env` file exists and has correct values
- ✅ Ensure port 5000 is not in use: `netstat -ano | findstr :5000`

#### Frontend shows "Network Error"
- ✅ Check backend is running on http://localhost:5000
- ✅ Verify `VITE_API_BASE` in frontend `.env`
- ✅ Check browser console for CORS errors

#### Login/Signup not working
- ✅ Check JWT_SECRET is set in backend `.env`
- ✅ Verify email format is valid
- ✅ Check password meets requirements (6+ characters)

#### Appointments not showing
- ✅ Ensure you're logged in (JWT token valid)
- ✅ Check browser localStorage for auth token
- ✅ Verify backend database has appointments

**See [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) for complete troubleshooting guide.**

---

## 💰 Cost Breakdown (Free Tier Deployment)

| Service | Plan | Monthly Cost | Limitations |
|---------|------|--------------|-------------|
| **MongoDB Atlas** | M0 Free | $0 | 512MB storage, shared CPU |
| **Render** | Free Web Service | $0 | Sleeps after 15min inactivity, 750 hrs/month |
| **Vercel** | Hobby | $0 | 100GB bandwidth/month, unlimited deployments |
| **GitHub** | Free | $0 | Unlimited public/private repos |
| **Total** | | **$0/month** | Perfect for portfolio projects! |

### When to Upgrade

**MongoDB Atlas** → M10 ($57/month):
- More than 512MB data
- Need dedicated resources
- Production traffic

**Render** → Starter ($7/month):
- Need always-on service (no cold starts)
- SSL for custom domains
- Higher resource limits

**Vercel** → Pro ($20/month):
- Team collaboration features
- More bandwidth
- Advanced analytics

---

## 📝 Environment Variables Reference

### Backend (`.env`)
```bash
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/medical-appointments
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/medical-appointments

# JWT secret key (generate a strong one for production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server port
PORT=5000

# Environment mode
NODE_ENV=development

# Frontend URL for CORS (update in production)
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env`)
```bash
# Backend API base URL
VITE_API_BASE=http://localhost:5000
# For production: https://your-render-url.onrender.com
```

### Generate Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Created as a demonstration project for learning the MERN stack.

---

## 🙏 Acknowledgments

- Built with ❤️ using the MERN stack
- Icons and styling inspired by modern healthcare applications
- Special thanks to the React, Node.js, and MongoDB communities

---

## 🔗 Helpful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 📞 Support & Questions

Having issues? Check these resources:

1. **[`TROUBLESHOOTING.md`](TROUBLESHOOTING.md)** - Common issues and solutions
2. **[`GETTING_STARTED.md`](GETTING_STARTED.md)** - Beginner-friendly guide
3. **[`API_DOCUMENTATION.md`](API_DOCUMENTATION.md)** - API reference
4. **GitHub Issues** - Open an issue for bugs or feature requests

---

## 🎯 Next Steps

### Just Cloned the Repository?
1. Read [`GETTING_STARTED.md`](GETTING_STARTED.md) for a beginner-friendly introduction
2. Follow the **Quick Start** section above to run locally
3. Explore the codebase using [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md)

### Ready to Deploy?
1. Start with [`DEPLOYMENT_SUMMARY.md`](DEPLOYMENT_SUMMARY.md) for overview
2. Follow [`GITHUB_SETUP.md`](GITHUB_SETUP.md) to push to GitHub
3. Use [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) to track progress
4. Reference [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) for detailed steps

### Want to Customize?
1. Review [`FEATURES.md`](FEATURES.md) to understand current features
2. Check [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for API details
3. Read [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) for architecture
4. Make your changes and test thoroughly

---

## ⭐ Star This Repository!

If you found this project helpful, please consider giving it a star ⭐

---

**Happy Coding! 🚀 Let's make healthcare more accessible through technology!** 🏥

---

*Last Updated: 2024 | Version: 1.0.0*
```

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team

## 🎯 Future Enhancements

- [ ] Email notifications (SendGrid/NodeMailer)
- [ ] SMS reminders (Twilio)
- [ ] Calendar integration (Google Calendar, iCal)
- [ ] Video consultation integration
- [ ] Medical records upload
- [ ] Prescription management
- [ ] Payment integration
- [ ] Doctor availability management
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## ⚡ Quick Start Commands

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (in a new terminal)
cd frontend && npm install && npm run dev
```

Then open `http://localhost:3000` in your browser!

---

**Built with ❤️ using the MERN Stack**
