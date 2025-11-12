// routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
