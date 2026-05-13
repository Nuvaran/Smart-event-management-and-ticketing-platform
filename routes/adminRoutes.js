const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const Event = require('../models/Event');
const Booking = require('../models/booking');
const Enquiry = require('../models/enquiry');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// All admin routes require auth and admin role
router.use(isAuthenticated, isAdmin);

// GET admin dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const [totalEvents, totalBookings, pendingEnquiries, recentBookings] = await Promise.all([
            Event.countDocuments(),
            Booking.countDocuments(),
            Enquiry.countDocuments({ status: 'unread' }),
            Booking.find().sort({ bookedAt: -1 }).limit(10)
                .populate('user', 'name')
                .populate('event', 'title')
                .lean()
                .then(bookings => bookings.filter(b => b.user && b.event))
        ]);
        res.render('pages/admin-dashboard', {
            title: 'Dashboard – Admin',
            stats: { totalEvents, totalBookings, totalRevenue: 0, pendingEnquiries },
            recentBookings
        });
    } catch (err) {
        res.status(500).send('Error loading dashboard: ' + err.message);
    }
});

// GET admin events
router.get('/events', async (req, res) => {
    try {
        const { search, status } = req.query;
        let filter = {};

        // Search by title
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        // Status filter 
        if (status) {
            const now = new Date();

            if (status === 'active') {
                filter.date = { $gte: now };
                filter.ticketsAvailable = { $gt: 0 };
            }
            if (status === 'cancelled') {
                filter.ticketsAvailable = 0;
            }
            if (status === 'draft') {
                filter.date = { $lt: now };
            }
        }

        const events = await Event.find(filter).sort({ date: -1 }).lean();

        res.render('pages/admin-events', {
            title: 'Manage Events – Admin',
            events,
            searchQuery: search || '',
            filterStatus: status || ''
        });

    } catch (err) {
        res.status(500).send('Error loading events: ' + err.message);
    }
});

// GET admin create event
router.get('/events/create', (req, res) => {
    res.render('pages/admin-create-event', {
        title: 'Create Event – Admin',
        errors: [],
        formData: {}
    });
});

// POST admin create event
router.post('/events/create', eventController.createEvent);

// GET admin edit event
router.get('/events/:id/edit', eventController.getEditEvent);

// POST admin edit event
router.post('/events/:id/edit', eventController.updateEvent);

// DELETE admin event
router.delete('/events/:id', eventController.deleteEvent);

// POST admin delete event
router.post('/events/:id/delete', eventController.deleteEvent);

// GET admin api bookings over time
router.get('/api/bookings-over-time', async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const raw = await Booking.aggregate([
            { $match: { bookedAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookedAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Build a full 30-day map with zero-fill for missing days
        const map = {};
        raw.forEach(r => { map[r._id] = r.count; });

        const labels = [];
        const data = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().slice(0, 10);
            labels.push(key);
            data.push(map[key] || 0);
        }

        res.json({ labels, data });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/top-events', async (req, res) => {
    try {
        const topEvents = await Booking.aggregate([
            {
                $match: {
                    status: 'confirmed'
                }
            },
            {
                $group: {
                    _id: "$event",
                    bookings: { $sum: "$ticketsBooked" }
                }
            },
            {
                $lookup: {
                    from: "events",
                    localField: "_id",
                    foreignField: "_id",
                    as: "event"
                }
            },
            {
                $unwind: "$event"
            },
            {
                $project: {
                    _id: 0,
                    title: "$event.title",
                    bookings: 1,
                    capacity: "$event.capacity"
                }
            },
            {
                $sort: { bookings: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json(topEvents);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET admin enquiries
router.get('/enquiries', async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
            .sort({ createdAt: -1 })
            .lean();

        res.render('pages/admin-enquiries', {
            title: 'User Enquiries – Admin',
            enquiries
        });

    } catch (err) {
        res.status(500).send('Error loading enquiries: ' + err.message);
    }
});

// POST admin mark enquiry as read
router.post('/enquiries/:id/read', async (req, res) => {
    await Enquiry.findByIdAndUpdate(req.params.id, { status: 'read' });
    res.redirect('/admin/enquiries');
});

// POST admin delete enquiry
router.post('/enquiries/:id/delete', async (req, res) => {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.redirect('/admin/enquiries');
});

module.exports = router;