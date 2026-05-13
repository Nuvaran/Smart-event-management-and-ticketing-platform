const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');

// GET login
router.get('/login', (req, res) => {
    if (req.session.user) {
        return req.session.user.role === 'admin'
            ? res.redirect('/admin/dashboard')
            : res.redirect('/');
    }

    res.render('pages/login', {
        layout: 'layouts/auth',
        title: 'Login',
        errors: []
    });
});

// POST login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.render('pages/login', {
                layout: 'layouts/auth',
                title: 'Login',
                errors: ['Invalid email or password']
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.render('pages/login', {
                layout: 'layouts/auth',
                title: 'Login',
                errors: ['Invalid email or password']
            });
        }

        // Store full user in session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        req.session.userId = user._id;
        req.session.role = user.role;

        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        }

        res.redirect('/');

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET register
router.get('/register', (req, res) => {
    res.render('pages/register', {
        layout: 'layouts/auth',
        title: 'Register',
        errors: []
    });
});

// POST register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const errors = [];

        if (!name || name.length < 2) {
            errors.push('Name must be at least 2 characters');
        }

        if (!email) {
            errors.push('Email is required');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });
        
        if (existingUser) {
            errors.push('Email already exists');
        }

        if (errors.length > 0) {
            return res.render('pages/register', {
                layout: 'layouts/auth',
                title: 'Register',
                errors,
                name,
                email
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: 'user'
        });

        res.redirect('/auth/login');

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
});

module.exports = router;