const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: {
    type: String, required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  message: { type: String, required: true, minlength: 10, maxlength: 1000 },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
