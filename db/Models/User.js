const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        default: true
    },
    email: {
        type: String,
        default: true
    },
    password: {
        type: String,
        default: true
    },
    verify: {
        type: Boolean,
        default:false
    },
    emailToken: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('users', registerSchema);