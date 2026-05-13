const Event = require('../models/Event');

// GET all events
exports.getAllEvents = async (req, res) => {
    try {
        const { q, category, dateFrom, dateTo, location, sort } = req.query;
        const filter = {};

        if (q && q.trim()) {
            filter.$or = [
                { title: { $regex: q.trim(), $options: 'i' } },
                { description: { $regex: q.trim(), $options: 'i' } },
                { location: { $regex: q.trim(), $options: 'i' } }
            ];
        }

        if (category) filter.category = category;

        if (location && location.trim()) {
            filter.location = { $regex: location.trim(), $options: 'i' };
        }

        if (dateFrom || dateTo) {
            filter.date = {};
            if (dateFrom) filter.date.$gte = new Date(dateFrom);
            if (dateTo) filter.date.$lte = new Date(new Date(dateTo).setHours(23, 59, 59));
        }

        const sortMap = {
            newest: { date: -1 },
            oldest: { date: 1 }
        };

        const sortOption = sortMap[sort] || { date: 1 };

        const events = await Event.find(filter).sort(sortOption).lean();

        res.render('pages/index', {
            events,
            totalEvents: events.length,
            searchQuery: q || '',
            filterCategory: category || '',
            filterDateFrom: dateFrom || '',
            filterDateTo: dateTo || '',
            filterLocation: location || '',
            sortBy: sort || 'upcoming'
        });

    } catch (err) {
        res.status(500).send('Error loading events: ' + err.message);
    }
};

// GET events by id
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).lean();
        res.render('pages/event-details', { event: event || null });
    } catch (err) {
        res.status(500).send('Error loading event: ' + err.message);
    }
};

// Create event
exports.createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            date,
            location,
            capacity
        } = req.body;

        const newCapacity = Number(capacity);

        await Event.create({
            title,
            description,
            category,
            date,
            location,
            capacity: newCapacity,
            // ticketsAvailable always starts equal to capacity
            ticketsAvailable: newCapacity,
            createdBy: req.session.user.id
        });

        res.redirect('/admin/events');

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get edit event form
exports.getEditEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).lean();
        if (!event) return res.status(404).send('Event not found');

        res.render('pages/admin-edit-event', {
            title: 'Edit Event – Admin',
            event,
            errors: []
        });

    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};

// Update event
exports.updateEvent = async (req, res) => {

    const { title, description, category, date, location, capacity } = req.body;

    const errors = [];

    if (!title || !title.trim()) errors.push('Event title is required.');
    if (!category) errors.push('Category is required.');
    if (!date) errors.push('Event date is required.');
    if (!capacity || Number(capacity) < 1) errors.push('Capacity must be at least 1.');

    if (errors.length) {
        const event = await Event.findById(req.params.id).lean();
        return res.render('pages/admin-edit-event', {
            title: 'Edit Event – Admin',
            event: { ...event, ...req.body },
            errors
        });
    }

    try {
        const existing = await Event.findById(req.params.id);
        if (!existing) return res.status(404).send('Event not found');

        // tickets already booked
        const booked = existing.capacity - existing.ticketsAvailable;

        const newCapacity = Number(capacity);

        // recalculate available tickets safely
        const maxAvailable = newCapacity - booked;
        const newAvailable = Math.max(0, maxAvailable);

        await Event.findByIdAndUpdate(req.params.id, {
            title: title.trim(),
            description: (description || '').trim(),
            category,
            date: new Date(date),
            location: (location || '').trim(),
            capacity: newCapacity,
            ticketsAvailable: newAvailable
        });

        res.redirect('/admin/events');

    } catch (err) {
        const event = await Event.findById(req.params.id).lean();

        res.render('pages/admin-edit-event', {
            title: 'Edit Event – Admin',
            event,
            errors: ['Failed to update event: ' + err.message]
        });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);

        if (
            req.headers.accept &&
            req.headers.accept.includes('application/json')
        ) {
            return res.json({ success: true });
        }

        res.redirect('/admin/events');

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting event'
        });
    }
};