# Project Structure Overview

## 📁 Complete File Tree

```
Hackfest/
│
├── 📄 README.md                    # Main documentation
├── 📄 SETUP_GUIDE.md               # Quick setup instructions
├── 📄 API_DOCUMENTATION.md         # Complete API reference
├── 📄 package.json                 # Root package file
├── 📄 .gitignore                   # Git ignore rules
│
├── 📂 backend/                     # Node.js/Express Backend
│   ├── 📄 server.js                # Main server entry point
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📄 .env.example             # Environment variables template
│   ├── 📄 .gitignore               # Backend git ignore
│   │
│   ├── 📂 models/                  # Mongoose Models
│   │   ├── User.js                 # User schema (patients/admin)
│   │   ├── Doctor.js               # Doctor schema
│   │   └── Appointment.js          # Appointment schema
│   │
│   ├── 📂 routes/                  # API Routes
│   │   ├── auth.js                 # Authentication routes
│   │   ├── users.js                # User routes
│   │   ├── doctors.js              # Doctor routes
│   │   └── appointments.js         # Appointment routes
│   │
│   ├── 📂 middleware/              # Custom Middleware
│   │   ├── auth.js                 # JWT authentication
│   │   └── adminAuth.js            # Admin authorization
│   │
│   └── 📂 scripts/                 # Utility Scripts
│       └── seedData.js             # Database seeding script
│
└── 📂 frontend/                    # React Frontend
    ├── 📄 index.html               # HTML entry point
    ├── 📄 package.json             # Frontend dependencies
    ├── 📄 vite.config.js           # Vite configuration
    ├── 📄 .env.example             # Frontend environment template
    ├── 📄 .gitignore               # Frontend git ignore
    │
    └── 📂 src/                     # Source Code
        ├── 📄 main.jsx             # React entry point
        ├── 📄 App.jsx              # Main app component with routing
        ├── 📄 api.js               # API helper functions
        ├── 📄 index.css            # Global styles
        │
        ├── 📂 components/          # Reusable Components
        │   ├── Header.jsx          # Navigation header
        │   ├── AppointmentCard.jsx # Appointment display card
        │   ├── DoctorCard.jsx      # Doctor profile card
        │   └── Loading.jsx         # Loading spinner
        │
        └── 📂 pages/               # Page Components
            ├── Login.jsx           # Login page
            ├── Signup.jsx          # Registration page
            ├── Dashboard.jsx       # User dashboard
            ├── Doctors.jsx         # Doctor listing & search
            ├── BookAppointment.jsx # Appointment booking form
            └── AppointmentHistory.jsx # Appointment history
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Vite)                            │
│                  http://localhost:3000                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Requests (JWT Auth)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                         BACKEND                              │
│                  (Node.js + Express)                         │
│                  http://localhost:5000                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Routes Layer                        │   │
│  │  /api/auth  /api/users  /api/doctors  /api/appts   │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │            Middleware Layer                          │   │
│  │      auth.js (JWT)  |  adminAuth.js (Role)         │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │              Business Logic                          │   │
│  │    Controllers + Validation + Error Handling        │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │            Mongoose Models                           │   │
│  │      User  |  Doctor  |  Appointment               │   │
│  └──────────────────────┬──────────────────────────────┘   │
└─────────────────────────┼──────────────────────────────────┘
                          │
┌─────────────────────────▼──────────────────────────────────┐
│                      DATABASE                                │
│                  MongoDB / Atlas                             │
│              mongodb://localhost:27017                       │
│                                                              │
│  Collections:  users  |  doctors  |  appointments           │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌──────────┐                  ┌──────────┐                ┌──────────┐
│  User    │                  │  Backend │                │ Database │
└────┬─────┘                  └────┬─────┘                └────┬─────┘
     │                             │                           │
     │ 1. POST /api/auth/register  │                           │
     │────────────────────────────>│                           │
     │                             │ 2. Hash password          │
     │                             │──────┐                    │
     │                             │      │                    │
     │                             │<─────┘                    │
     │                             │ 3. Save user              │
     │                             │──────────────────────────>│
     │                             │                           │
     │                             │ 4. User created           │
     │                             │<──────────────────────────│
     │                             │ 5. Generate JWT           │
     │                             │──────┐                    │
     │                             │      │                    │
     │                             │<─────┘                    │
     │ 6. Return token + user data │                           │
     │<────────────────────────────│                           │
     │                             │                           │
     │ 7. Store token in localStorage                         │
     │──────┐                      │                           │
     │      │                      │                           │
     │<─────┘                      │                           │
     │                             │                           │
     │ 8. Future requests with token                          │
     │    Authorization: Bearer <token>                       │
     │────────────────────────────>│                           │
     │                             │ 9. Verify JWT             │
     │                             │──────┐                    │
     │                             │      │                    │
     │                             │<─────┘                    │
     │                             │ 10. Attach user to req    │
     │                             │──────┐                    │
     │                             │      │                    │
     │                             │<─────┘                    │
     │ 11. Protected resource      │                           │
     │<────────────────────────────│                           │
```

## 📊 Database Schema Relationships

```
┌─────────────────────────┐
│        User             │
│─────────────────────────│
│ _id: ObjectId (PK)      │
│ name: String            │
│ email: String (unique)  │
│ passwordHash: String    │
│ role: String            │
│ phone: String           │
│ dateOfBirth: Date       │
│ address: String         │
│ createdAt: Date         │
└───────────┬─────────────┘
            │
            │ patient (FK)
            │
            │
┌───────────▼─────────────┐       ┌─────────────────────────┐
│    Appointment          │       │        Doctor           │
│─────────────────────────│       │─────────────────────────│
│ _id: ObjectId (PK)      │       │ _id: ObjectId (PK)      │
│ patient: ObjectId (FK)──┼──────>│ name: String            │
│ doctor: ObjectId (FK) ──┼───────>│ specialization: String  │
│ date: Date              │       │ email: String           │
│ timeSlot: String        │       │ phone: String           │
│ reason: String          │       │ qualification: String   │
│ symptoms: String        │       │ experience: Number      │
│ status: String          │       │ consultationFee: Number │
│ notes: String           │       │ availableDays: [String] │
│ cancelledBy: ObjectId   │       │ workingHours: Object    │
│ cancelledAt: Date       │       │ slotDuration: Number    │
│ cancellationReason: Str │       │ imageUrl: String        │
│ createdAt: Date         │       │ bio: String             │
│ updatedAt: Date         │       │ isActive: Boolean       │
└─────────────────────────┘       │ createdAt: Date         │
                                  └─────────────────────────┘

Relationships:
- One User (patient) can have many Appointments (1:N)
- One Doctor can have many Appointments (1:N)
- One Appointment belongs to one User and one Doctor (N:1)
```

## 🎨 Component Hierarchy

```
App
├── Header
│   └── Navigation Links
│       ├── Dashboard
│       ├── Doctors
│       ├── My Appointments
│       └── Logout Button
│
└── Routes
    ├── /login → Login
    ├── /signup → Signup
    ├── /dashboard → Dashboard
    │   ├── Stats Cards
    │   └── Upcoming Appointments
    │       └── AppointmentCard (multiple)
    │
    ├── /doctors → Doctors
    │   ├── Search & Filter
    │   └── Doctor Grid
    │       └── DoctorCard (multiple)
    │
    ├── /book-appointment → BookAppointment
    │   ├── Doctor Selection
    │   ├── Date Picker
    │   ├── Time Slot Selector
    │   └── Booking Form
    │
    └── /appointments → AppointmentHistory
        ├── Filter Tabs
        └── Appointment List
            └── AppointmentCard (multiple)
```

## 🚀 Request/Response Flow Example

### Booking an Appointment

```
1. User Action
   └─> Click "Book Appointment" button on DoctorCard

2. Navigate to BookAppointment page
   └─> Pre-populate doctor information

3. User fills form
   ├─> Select date
   ├─> Select time slot
   └─> Enter reason & symptoms

4. Submit form
   └─> createAppointment(formData) in api.js

5. API Call
   POST /api/appointments
   Headers: { Authorization: Bearer <token> }
   Body: {
     doctorId: "...",
     date: "2024-07-15",
     timeSlot: "10:00",
     reason: "Checkup",
     symptoms: "..."
   }

6. Backend Processing
   ├─> auth middleware verifies JWT
   ├─> Extract user from token
   ├─> Validate input
   ├─> Check doctor exists
   ├─> Check time slot availability
   └─> Create appointment in DB

7. Response
   └─> 201 Created with appointment data

8. Frontend Updates
   ├─> Show success message
   └─> Navigate to dashboard
```

## 🔑 Key Files Explained

### Backend

- **server.js**: Express app setup, middleware, routes, DB connection
- **models/**: Mongoose schemas defining data structure
- **routes/**: API endpoint handlers and business logic
- **middleware/auth.js**: Verifies JWT tokens for protected routes
- **scripts/seedData.js**: Populates DB with sample data

### Frontend

- **main.jsx**: React app initialization
- **App.jsx**: Routing configuration and protected routes
- **api.js**: Centralized API calls with auth headers
- **pages/**: Full page components for each route
- **components/**: Reusable UI components

## 📦 Dependencies Overview

### Backend Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT creation/verification
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **express-validator**: Input validation

### Frontend Dependencies
- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **date-fns**: Date manipulation

## 🎯 Feature Implementation Map

```
Feature                     Backend                  Frontend
─────────────────────────────────────────────────────────────
Authentication              /routes/auth.js          Login.jsx, Signup.jsx
User Profile                /routes/users.js         Dashboard.jsx
Doctor Listing              /routes/doctors.js       Doctors.jsx
Appointment Booking         /routes/appointments.js  BookAppointment.jsx
Appointment Management      /routes/appointments.js  AppointmentHistory.jsx
Authorization               /middleware/auth.js      api.js (authHeaders)
Admin Features              /middleware/adminAuth.js N/A (future)
```
