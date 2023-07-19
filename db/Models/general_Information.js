const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    phone: {
        type: Number,
    },
    companyname: {
        type: String,
    },
    companywebsite: {
        type: String,
    },
    companyaddress: {
        type: String,
    },

});

module.exports = mongoose.model('general_Information', generalInfoSchema);