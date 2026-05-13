require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Session Config
app.use(session({
    secret: process.env.SESSION_SECRET || 'smart-events-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Global User Middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/events', require('./routes/eventRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/contact', require('./routes/enquiryRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Home Route
const eventController = require('./controllers/eventController');
app.get('/', eventController.getAllEvents);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });