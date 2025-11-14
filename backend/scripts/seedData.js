// Sample seed script to populate the database with initial data
// Run with: node scripts/seedData.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const doctors = [
  {
    name: 'Dr. Rajesh Kumar',
    specialization: 'Cardiology',
    email: 'rajesh.kumar@hospital.com',
    phone: '+91 98765 43210',
    qualification: 'MBBS, MD, DM (Cardiology)',
    experience: 15,
    consultationFee: 1200,
    bio: 'Specialized in cardiovascular diseases with over 15 years of experience.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' }
  },
  {
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrics',
    email: 'priya.sharma@hospital.com',
    phone: '+91 98765 43211',
    qualification: 'MBBS, MD (Pediatrics)',
    experience: 12,
    consultationFee: 1000,
    bio: 'Dedicated pediatrician providing comprehensive care for children.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00', end: '16:00' }
  },
  {
    name: 'Dr. Anjali Verma',
    specialization: 'Dermatology',
    email: 'anjali.verma@hospital.com',
    phone: '+91 98765 43212',
    qualification: 'MBBS, MD (Dermatology)',
    experience: 10,
    consultationFee: 800,
    bio: 'Expert in skin conditions and cosmetic dermatology.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '10:00', end: '18:00' }
  },
  {
    name: 'Dr. Arjun Patel',
    specialization: 'Orthopedics',
    email: 'arjun.patel@hospital.com',
    phone: '+91 98765 43213',
    qualification: 'MBBS, MS (Orthopedics)',
    experience: 18,
    consultationFee: 1500,
    bio: 'Specialized in sports medicine and joint replacement surgery.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' }
  },
  {
    name: 'Dr. Sneha Reddy',
    specialization: 'General Practice',
    email: 'sneha.reddy@hospital.com',
    phone: '+91 98765 43214',
    qualification: 'MBBS',
    experience: 8,
    consultationFee: 500,
    bio: 'Primary care physician providing comprehensive healthcare services.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00', end: '18:00' }
  },
  {
    name: 'Dr. Vikram Singh',
    specialization: 'Neurology',
    email: 'vikram.singh@hospital.com',
    phone: '+91 98765 43215',
    qualification: 'MBBS, MD, DM (Neurology)',
    experience: 20,
    consultationFee: 1800,
    bio: 'Expert in neurological disorders and brain health.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Doctor.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed doctors
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`✅ Created ${createdDoctors.length} doctors`);

    // Create sample admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@medbook.com',
      passwordHash: adminPassword,
      role: 'admin',
      phone: '+1 (555) 000-0000'
    });
    console.log('✅ Created admin user (admin@medbook.com / admin123)');

    // Create sample patient user
    const patientPassword = await bcrypt.hash('patient123', 10);
    await User.create({
      name: 'John Doe',
      email: 'patient@example.com',
      passwordHash: patientPassword,
      role: 'patient',
      phone: '+1 (555) 111-2222',
      dateOfBirth: new Date('1990-01-15'),
      address: '123 Main St, New York, NY 10001'
    });
    console.log('✅ Created patient user (patient@example.com / patient123)');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@medbook.com / admin123');
    console.log('Patient: patient@example.com / patient123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
