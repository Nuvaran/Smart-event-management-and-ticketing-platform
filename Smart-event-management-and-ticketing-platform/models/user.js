const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // This will be the hashed version
    role: { 
        type: String, 
        enum: ['Standard User', 'Admin'], 
        default: 'Standard User' 
    }
});

module.exports = mongoose.model('User', userSchema);