require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const User = require('./models/User');
const Event = require('./models/Event');

const seedDB = async () => {
  await connectDB();

  await User.deleteMany({});
  await Event.deleteMany({});

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@events.com',
    password: 'Admin2026',
    role: 'admin'
  });

  await Event.create([
    {
      title: 'WomenInTech Conference 2026',
      description: 'A major technology conference empowering women.',
      category: 'conference',
      date: new Date('2026-09-15'),
      location: 'Cape Town, SA',
      capacity: 500,
      ticketsAvailable: 500,
      createdBy: admin._id
    },
    {
      title: 'Hey Neighbour Festival',
      description: 'An outdoor music festival featuring top local artists.',
      category: 'festival',
      date: new Date('2026-11-01'),
      location: 'Cape Town, SA',
      capacity: 2500,
      ticketsAvailable: 2500,
      createdBy: admin._id
    }
  ]);

  console.log('The database seeded!');
  process.exit();
};

seedDB();
