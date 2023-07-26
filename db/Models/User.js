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
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1690362819~exp=1690363419~hmac=adeefbb4d8d6c8ea486ba074e25f76c56b69bf5c379c7057d63e492e8e2e5890"
    },
    // name:String,
    // email:String,
    // password:String,
    // is_varified:Number
});

module.exports = mongoose.model('users', registerSchema);