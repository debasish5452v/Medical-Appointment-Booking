# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-15",
  "address": "123 Main St"
}
```

**Response:** (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

## User Endpoints

### Get Current User
**GET** `/users/me` 🔒

**Response:** (200 OK)
```json
{
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "address": "123 Main St",
    "createdAt": "2023-06-25T10:30:00.000Z"
  }
}
```

---

## Doctor Endpoints

### Get All Doctors
**GET** `/doctors`

**Query Parameters:**
- `specialization` (optional): Filter by specialization

**Response:** (200 OK)
```json
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiology",
    "email": "sarah@hospital.com",
    "phone": "+1234567891",
    "qualification": "MD, FACC",
    "experience": 15,
    "consultationFee": 150,
    "bio": "Specialized in cardiovascular diseases...",
    "availableDays": ["Monday", "Tuesday", "Wednesday"],
    "workingHours": {
      "start": "09:00",
      "end": "17:00"
    },
    "isActive": true
  }
]
```

### Get Doctor by ID
**GET** `/doctors/:id`

**Response:** (200 OK)
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1b",
  "name": "Dr. Sarah Johnson",
  "specialization": "Cardiology",
  "email": "sarah@hospital.com",
  "phone": "+1234567891",
  "qualification": "MD, FACC",
  "experience": 15,
  "consultationFee": 150,
  "bio": "Specialized in cardiovascular diseases...",
  "availableDays": ["Monday", "Tuesday", "Wednesday"],
  "workingHours": {
    "start": "09:00",
    "end": "17:00"
  },
  "isActive": true
}
```

### Create Doctor (Admin Only)
**POST** `/doctors` 🔒 👑

**Body:**
```json
{
  "name": "Dr. Jane Smith",
  "specialization": "Pediatrics",
  "email": "jane@hospital.com",
  "phone": "+1234567892",
  "qualification": "MD, FAAP",
  "experience": 10,
  "consultationFee": 120,
  "bio": "Specialized in child healthcare...",
  "availableDays": ["Monday", "Wednesday", "Friday"],
  "workingHours": {
    "start": "08:00",
    "end": "16:00"
  }
}
```

**Response:** (201 Created)

### Update Doctor (Admin Only)
**PUT** `/doctors/:id` 🔒 👑

**Body:** (Same as Create, all fields optional)

**Response:** (200 OK)

### Delete Doctor (Admin Only)
**DELETE** `/doctors/:id` 🔒 👑

**Response:** (200 OK)
```json
{
  "message": "Doctor deactivated successfully"
}
```

---

## Appointment Endpoints

### Get User's Appointments
**GET** `/appointments` 🔒

**Query Parameters:**
- `status` (optional): Filter by status (booked, cancelled, completed, no-show)
- `upcoming` (optional): Set to "true" to get only upcoming appointments

**Response:** (200 OK)
```json
[
  {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "patient": "60d5ec49f1b2c72b8c8e4f1a",
    "doctor": {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "name": "Dr. Sarah Johnson",
      "specialization": "Cardiology",
      "email": "sarah@hospital.com",
      "phone": "+1234567891",
      "consultationFee": 150
    },
    "date": "2024-07-15T00:00:00.000Z",
    "timeSlot": "10:00",
    "reason": "Regular checkup",
    "symptoms": "Chest pain",
    "status": "booked",
    "createdAt": "2024-07-01T10:30:00.000Z",
    "updatedAt": "2024-07-01T10:30:00.000Z"
  }
]
```

### Get All Appointments (Admin Only)
**GET** `/appointments/admin/all` 🔒 👑

**Query Parameters:**
- `status` (optional): Filter by status
- `date` (optional): Filter by specific date (YYYY-MM-DD)

**Response:** (200 OK) - Similar to user appointments but includes patient details

### Get Appointment by ID
**GET** `/appointments/:id` 🔒

**Response:** (200 OK)
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1c",
  "patient": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "doctor": {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiology",
    "email": "sarah@hospital.com",
    "phone": "+1234567891",
    "consultationFee": 150
  },
  "date": "2024-07-15T00:00:00.000Z",
  "timeSlot": "10:00",
  "reason": "Regular checkup",
  "symptoms": "Chest pain",
  "status": "booked",
  "createdAt": "2024-07-01T10:30:00.000Z",
  "updatedAt": "2024-07-01T10:30:00.000Z"
}
```

### Create Appointment
**POST** `/appointments` 🔒

**Body:**
```json
{
  "doctorId": "60d5ec49f1b2c72b8c8e4f1b",
  "date": "2024-07-15",
  "timeSlot": "10:00",
  "reason": "Regular checkup",
  "symptoms": "Chest pain"
}
```

**Response:** (201 Created)
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1c",
  "patient": "60d5ec49f1b2c72b8c8e4f1a",
  "doctor": {
    "_id": "60d5ec49f1b2c72b8c8e4f1b",
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiology",
    "consultationFee": 150
  },
  "date": "2024-07-15T00:00:00.000Z",
  "timeSlot": "10:00",
  "reason": "Regular checkup",
  "symptoms": "Chest pain",
  "status": "booked",
  "createdAt": "2024-07-01T10:30:00.000Z"
}
```

### Cancel Appointment
**PUT** `/appointments/:id/cancel` 🔒

**Body:**
```json
{
  "reason": "Personal reasons"
}
```

**Response:** (200 OK)
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1c",
  "status": "cancelled",
  "cancelledBy": "60d5ec49f1b2c72b8c8e4f1a",
  "cancelledAt": "2024-07-02T14:30:00.000Z",
  "cancellationReason": "Personal reasons",
  ...
}
```

### Update Appointment Status (Admin Only)
**PUT** `/appointments/:id/status` 🔒 👑

**Body:**
```json
{
  "status": "completed"
}
```

**Response:** (200 OK)

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "message": "This time slot is already booked"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Status Codes Summary

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict
- **500 Internal Server Error**: Server error

---

## Legend

- 🔒 = Requires authentication
- 👑 = Requires admin role

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Doctors
```bash
curl http://localhost:5000/api/doctors
```

### Create Appointment (with auth)
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"doctorId":"DOCTOR_ID","date":"2024-07-15","timeSlot":"10:00","reason":"Checkup"}'
```
