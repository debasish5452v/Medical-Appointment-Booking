# 🏥 Medical Appointment Booking System

A modern, full-stack healthcare solution built with the MERN stack for seamless medical appointment management.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 🌟 Overview

This application streamlines the appointment booking process, connecting patients with healthcare professionals through an intuitive digital platform. Built from the ground up with modern web technologies, it offers a complete solution for managing medical appointments.

---

## ✨ Key Features

### Patient Portal
- 🔐 Secure user authentication with JWT
- 👨‍⚕️ Browse doctors by specialization
- 📅 Real-time appointment booking
- 📋 Complete appointment history
- ❌ One-click cancellation
- 📱 Fully responsive design

### Admin Dashboard
- 👥 User and doctor management
- 📊 Appointment oversight and approval
- ✅ Request management system
- 📈 Analytics and statistics

### Technical Highlights
- ⚡ Lightning-fast Vite build tool
- 🔒 Encrypted password storage
- ✅ Comprehensive input validation
- 🎨 Modern, animated UI
- 🌐 RESTful API architecture

---

## 🛠️ Tech Stack

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt Password Hashing

**Frontend**
- React 18 with Hooks
- Vite Build Tool
- React Router v6
- Modern CSS3

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/debasish5452v/Medical-Appointment-Booking.git
cd Medical-Appointment-Booking
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

4. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 📁 Project Structure

```
medical-appointment-system/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   └── server.js        # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Application pages
│   │   └── api.js       # API integration
│   └── index.css        # Global styles
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details

### Appointments
- `GET /api/appointments` - User appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `GET /api/admin/appointments` - All appointments (Admin)

---

## 🎨 Features in Detail

### User Authentication
Secure signup and login system using JWT tokens with password encryption via bcrypt.

### Appointment Booking
Intuitive interface for selecting doctors, dates, and time slots with real-time availability.

### Doctor Management
Browse medical professionals by specialization including Cardiology, Dermatology, Pediatrics, and more.

### Dashboard
Personalized user dashboard with upcoming appointments, quick actions, and statistics.

---

## 🔒 Security

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation on both client and server
- MongoDB injection prevention
- XSS protection

---

## 📱 Responsive Design

Fully responsive interface that works seamlessly across:
- 💻 Desktop computers
- 📱 Mobile devices
- 📲 Tablets

---

## 🌐 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Agora credentials (for video calling)
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5000
```

---

## 🎥 Agora Video Calling Setup

This application uses **Agora.io** for real-time video consultations between patients and doctors.

### Getting Agora Credentials

1. **Sign up** at [Agora Console](https://console.agora.io)
2. **Create a new project**:
   - Go to "Projects" → "Create"
   - Choose "Secured mode: APP ID + Token" (recommended)
   - Copy your **App ID**
   - Enable and copy your **App Certificate**
3. **Add to backend/.env**:
   ```
   AGORA_APP_ID=your_app_id_here
   AGORA_APP_CERTIFICATE=your_certificate_here
   ```
4. **Add to Render** environment variables (for production)

### How Video Calling Works

- **Join Call**: Patients/doctors click "🎥 Join Video Call" on upcoming appointments
- **Security**: Backend generates temporary tokens for each call session
- **Privacy**: Each appointment has a unique channel (appointment ID)
- **Compatibility**: Works in all modern browsers with camera/microphone permissions

### Testing Video Calls Locally

1. Book an appointment as a test patient
2. Open appointment history page
3. Click "Join Video Call" on an upcoming appointment
4. Open another browser window (or incognito mode)
5. Login as the doctor and join the same appointment
6. Both users should see each other's video/audio

---

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create free M0 cluster
2. Whitelist IP addresses
3. Create database user
4. Get connection string

### Deploy Backend
- **Render**: Connect GitHub repo, add environment variables
- **Heroku**: `git push heroku main`

### Deploy Frontend
- **Vercel**: Import from GitHub
- **Netlify**: Connect repository

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Debasish Mahata**

- GitHub: [@debasish5452v](https://github.com/debasish5452v)
- Project: [Medical Appointment Booking](https://github.com/debasish5452v/Medical-Appointment-Booking)

---

## 🙏 Acknowledgments

Built with modern web technologies to provide an efficient healthcare appointment management solution.

---

**⭐ If you find this project useful, please consider giving it a star!**
