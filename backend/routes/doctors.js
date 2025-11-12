// routes/doctors.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const Doctor = require('../models/Doctor');

// Get all active doctors (public)
router.get('/', async (req, res) => {
  try {
    const { specialization } = req.query;
    const filter = { isActive: true };
    
    if (specialization) {
      filter.specialization = new RegExp(specialization, 'i');
    }
    
    const doctors = await Doctor.find(filter)
      .select('-__v')
      .sort({ name: 1 });
    
    res.json(doctors);
  } catch (err) {
    console.error('Get doctors error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error('Get doctor error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create doctor (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    console.error('Create doctor error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update doctor (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error('Update doctor error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete doctor (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json({ message: 'Doctor deactivated successfully' });
  } catch (err) {
    console.error('Delete doctor error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
