require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/Users');
const Event = require('./models/Event');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected for seeding');

    await User.deleteMany({});
    await Event.deleteMany({});

    const hashedPassword = await bcrypt.hash('Admin2026', 10);
    const admin = await User.create({
      name: 'admin',
      email: 'admin@events.com',
      password: hashedPassword,
      role: 'admin'
    });

    await Event.create([
      {
        title: 'WomenInTech Conference 2026',
        description: 'Empowering women in technology.',
        category: 'conference',
        date: new Date('2026-09-15'),
        location: 'Cape Town, SA',
        capacity: 500,
        ticketsAvailable: 500,
        createdBy: admin._id
      }
    ]);

    console.log('Seed Successful!');
    process.exit();
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seedDB();