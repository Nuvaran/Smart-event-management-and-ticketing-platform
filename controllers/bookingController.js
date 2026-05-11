const Booking = require(`../models/booking`);
const Event = require(`../models/event`);

exports.bookTicket = async (req,res) => {
    try{
        const eventId = req.params.id;
        const userId = req.session.userId;

        const newBooking = new Booking({event: eventId, user: userId, ticketsBooked: 1});
        await newBooking.save();

        await Event.findByIdAndUpdate(eventId, {$inc: {ticketsAvailable: -1}});

        res.redirect(`/bookings/my-bookings`);
    } catch (error){
        res.status(500).send("Booking failed");
    }
}