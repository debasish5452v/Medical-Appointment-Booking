// models/Doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialization: { 
    type: String, 
    required: [true, 'Specialization is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: { 
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  availableDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  workingHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '17:00' }
  },
  slotDuration: {
    type: Number,
    default: 30 // minutes
  },
  imageUrl: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index for faster queries
DoctorSchema.index({ specialization: 1, isActive: 1 });

module.exports = mongoose.model('Doctor', DoctorSchema);
