const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['conference', 'festival', 'workshop', 'other'] },
  date: { type: Date, required: true },
  location: String,
  capacity: { type: Number, required: true },
  ticketsAvailable: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', eventSchema);