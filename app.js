require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.userId || null;
  next();
});


app.use('/auth', require('./routes/authRoutes'));
app.use('/events', require('./routes/eventRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/contact', require('./routes/enquiryRoutes'));


const eventController = require('./controllers/eventController');
app.get('/', eventController.getAllEvents);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected via .env');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));