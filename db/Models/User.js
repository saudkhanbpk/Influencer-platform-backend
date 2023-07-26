const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        default: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    timeZones: {
        type: String
    },
    plan: {
        type: String
    },
    billingDetails: [
        {
            cardNumber: {
                type: String
            },
            cardHolderName: {
                type: String
            },
            zipCode: {
                type: String
            },
            country: {
                type: String
            },
        }
    ],

    members: [
        {
            email: {
                type: String
            },
        }
    ],

    notifications: [
        {
            newMessages: {
                type: Boolean
            },
            jobApplications: {
                type: Boolean
            },
            influncerSignups: {
                type: Boolean
            },
            influncerAddedToDatabase: {
                type: Boolean
            },
            membership: {
                type: Boolean
            },
            newMessages: {
                type: Boolean
            },
            emailjobApplications: {
                type: Boolean
            },
            emailinfluncerSignups: {
                type: Boolean
            },
            emailinfluncerAddedToDatabase: {
                type: Boolean
            },
            emailmembership: {
                type: Boolean
            },

        }
    ],


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
        default: false
    },
    emailToken: {
        type: String,
        required: true,
    },
    // name:String,
    // email:String,
    // password:String,
    // is_varified:Number
});

module.exports = mongoose.model('users', registerSchema);