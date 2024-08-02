const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
});

// Create model or collection 
const User = mongoose.model('register', UserSchema); // 'User' is a singular name for the collection
module.exports = User;
