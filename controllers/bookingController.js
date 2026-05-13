const Booking = require('../models/booking');
const Event   = require('../models/Event');

// POST /bookings/:id — Book a ticket 
exports.bookTicket = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId  = req.session.user.id;

        const quantity = parseInt(req.body.quantity, 10) || 1;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).send('Event not found.');

        if (event.ticketsAvailable < quantity) {
            return res.redirect(`/events/${eventId}?error=not_enough_tickets`);
        }

        // Prevents double-booking same event
        const existing = await Booking.findOne({
            user: userId,
            event: eventId,
            status: 'confirmed'
        });

        if (existing) {
            return res.redirect(`/events/${eventId}?error=already_booked`);
        }

        await Booking.create({
            event: eventId,
            user: userId,
            ticketsBooked: quantity
        });

        await Event.findByIdAndUpdate(eventId, {
            $inc: { ticketsAvailable: -quantity }
        });

        res.redirect('/bookings/my-bookings?success=booked');

    } catch (err) {
        res.status(500).send('Booking failed: ' + err.message);
    }
};

// GET /bookings/my-bookings — User booking list
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.session.user.id })
            .populate('event')
            .populate('user')
            .sort({ bookedAt: -1 })
            .lean();

        res.render('pages/my-bookings', {
            title: 'My Bookings – Smart Events',
            bookings
        });
    } catch (err) {
        res.status(500).send('Error loading bookings: ' + err.message);
    }
};

// POST /bookings/:id/cancel — Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).send('Booking not found.');

        // Only the owner can cancel
        if (booking.user.toString() !== req.session.userId.toString()) {
            return res.status(403).send('Not authorised.');
        }
        if (booking.status === 'cancelled') {
            return res.redirect('/bookings/my-bookings?error=already_cancelled');
        }

        booking.status = 'cancelled';
        await booking.save();

        // Return the ticket to the pool
        await Event.findByIdAndUpdate(booking.event, { $inc: { ticketsAvailable: 1 } });

        res.redirect('/bookings/my-bookings?success=cancelled');

    } catch (err) {
        res.status(500).send('Cancel failed: ' + err.message);
    }
};