// routes/appointments.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Get appointments for current user
router.get('/', auth, async (req, res) => {
  try {
    const { status, upcoming } = req.query;
    const filter = { patient: req.user._id };
    
    if (status) {
      filter.status = status;
    }
    
    if (upcoming === 'true') {
      filter.date = { $gte: new Date() };
      filter.status = 'booked';
    }
    
    const appointments = await Appointment.find(filter)
      .populate('doctor', 'name specialization email phone consultationFee')
      .sort({ date: -1 });
    
    res.json(appointments);
  } catch (err) {
    console.error('Get appointments error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all appointments (admin only)
router.get('/admin/all', auth, adminAuth, async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }
    
    const appointments = await Appointment.find(filter)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialization')
      .sort({ date: -1 });
    
    res.json(appointments);
  } catch (err) {
    console.error('Get all appointments error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'name specialization email phone consultationFee')
      .populate('patient', 'name email phone');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check authorization
    if (!appointment.patient._id.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(appointment);
  } catch (err) {
    console.error('Get appointment error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason, symptoms } = req.body;
    
    if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ message: 'Doctor, date, and time slot are required' });
    }
    
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({ message: 'Doctor not found or inactive' });
    }
    
    // Check for conflicts
    const appointmentDate = new Date(date);
    const conflict = await Appointment.findOne({ 
      doctor: doctorId, 
      date: appointmentDate,
      timeSlot,
      status: 'booked' 
    });
    
    if (conflict) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }
    
    // Check if appointment is in the past
    if (appointmentDate < new Date()) {
      return res.status(400).json({ message: 'Cannot book appointments in the past' });
    }
    
    // Create appointment
    const appointment = await Appointment.create({ 
      patient: req.user._id, 
      doctor: doctorId, 
      date: appointmentDate,
      timeSlot,
      reason,
      symptoms
    });
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name specialization email phone consultationFee');
    
    res.status(201).json(populatedAppointment);
  } catch (err) {
    console.error('Create appointment error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Cancel appointment
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check authorization
    if (!appointment.patient.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }
    
    if (appointment.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed appointment' });
    }
    
    appointment.status = 'cancelled';
    appointment.cancelledBy = req.user._id;
    appointment.cancelledAt = new Date();
    appointment.cancellationReason = req.body.reason || 'No reason provided';
    
    await appointment.save();
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctor', 'name specialization email phone');
    
    res.json(populatedAppointment);
  } catch (err) {
    console.error('Cancel appointment error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update appointment status (admin only)
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['booked', 'cancelled', 'completed', 'no-show'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('doctor patient');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (err) {
    console.error('Update appointment status error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
