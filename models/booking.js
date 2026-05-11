const mongoose = require(`mongoose`);

const bookingSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: `Event`, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: `user`, required: true},
    bookingDate: {type: Date, default: Date.now},
    tickets: {type: Number,default: 1}
})

module.exports = mongoose.model(`Booking`, bookingSchema);