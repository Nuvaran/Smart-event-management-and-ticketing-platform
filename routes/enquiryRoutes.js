const express = require('express');
const router = express.Router();
const Enquiry = require('../models/enquiry');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Get contact page
router.get('/', (req, res) => {
    res.render('pages/contact', { title: 'Contact Us – Smart Events', errors: [], formData: {} });
});

// Post contact form
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    const errors = [];

    if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email address.');
    if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

    if (errors.length) {
        return res.render('pages/contact', {
            title: 'Contact Us – Smart Events', errors,
            formData: { name, email, message }
        });
    }
    try {
        await Enquiry.create({ name: name.trim(), email: email.trim(), message: message.trim() });
        res.render('pages/contact', {
            title: 'Contact Us – Smart Events', errors: [], formData: {},
            successMessage: true
        });
    } catch (err) {
        res.render('pages/contact', {
            title: 'Contact Us – Smart Events',
            errors: ['Failed to send message. Please try again.'],
            formData: { name, email, message }
        });
    }
});

// Get admin enquiry list
router.get('/admin', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const enquiries = await Enquiry.find(filter).sort({ submittedAt: -1 }).lean();
        res.render('pages/admin-enquiries', {
            title: 'Enquiries – Admin', enquiries,
            filterStatus: status || ''
        });
    } catch (err) {
        res.status(500).send('Error loading enquiries: ' + err.message);
    }
});

// Post mark enquiry as read
router.post('/:id/mark-read', isAuthenticated, isAdmin, async (req, res) => {
    await Enquiry.findByIdAndUpdate(req.params.id, { status: 'read' });
    res.redirect('/contact/admin');
});

// Post delete enquiry
router.post('/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.redirect('/contact/admin');
});

module.exports = router;