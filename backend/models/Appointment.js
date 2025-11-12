// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Patient is required']
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor',
    required: [true, 'Doctor is required']
  },
  date: { 
    type: Date, 
    required: [true, 'Appointment date is required']
  },
  timeSlot: {
    type: String,
    required: true
  },
  reason: { 
    type: String,
    trim: true,
    default: 'General consultation'
  },
  symptoms: {
    type: String,
    trim: true
  },
  status: { 
    type: String, 
    enum: ['booked', 'cancelled', 'completed', 'no-show'], 
    default: 'booked' 
  },
  notes: {
    type: String,
    trim: true
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster queries
AppointmentSchema.index({ patient: 1, date: 1 });
AppointmentSchema.index({ doctor: 1, date: 1 });
AppointmentSchema.index({ status: 1, date: 1 });

// Update the updatedAt timestamp before saving
AppointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
