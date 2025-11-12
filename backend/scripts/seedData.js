// Sample seed script to populate the database with initial data
// Run with: node scripts/seedData.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const doctors = [
  {
    name: 'Sarah Johnson',
    specialization: 'Cardiology',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    qualification: 'MD, FACC',
    experience: 15,
    consultationFee: 150,
    bio: 'Specialized in cardiovascular diseases with over 15 years of experience.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' }
  },
  {
    name: 'Michael Chen',
    specialization: 'Pediatrics',
    email: 'michael.chen@hospital.com',
    phone: '+1 (555) 234-5678',
    qualification: 'MD, FAAP',
    experience: 12,
    consultationFee: 120,
    bio: 'Dedicated pediatrician providing comprehensive care for children.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00', end: '16:00' }
  },
  {
    name: 'Emily Rodriguez',
    specialization: 'Dermatology',
    email: 'emily.rodriguez@hospital.com',
    phone: '+1 (555) 345-6789',
    qualification: 'MD, FAAD',
    experience: 10,
    consultationFee: 130,
    bio: 'Expert in skin conditions and cosmetic dermatology.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '10:00', end: '18:00' }
  },
  {
    name: 'David Williams',
    specialization: 'Orthopedics',
    email: 'david.williams@hospital.com',
    phone: '+1 (555) 456-7890',
    qualification: 'MD, FAAOS',
    experience: 18,
    consultationFee: 180,
    bio: 'Specialized in sports medicine and joint replacement surgery.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' }
  },
  {
    name: 'Lisa Martinez',
    specialization: 'General Practice',
    email: 'lisa.martinez@hospital.com',
    phone: '+1 (555) 567-8901',
    qualification: 'MD',
    experience: 8,
    consultationFee: 100,
    bio: 'Primary care physician providing comprehensive healthcare services.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00', end: '18:00' }
  },
  {
    name: 'James Taylor',
    specialization: 'Neurology',
    email: 'james.taylor@hospital.com',
    phone: '+1 (555) 678-9012',
    qualification: 'MD, FAAN',
    experience: 20,
    consultationFee: 200,
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
