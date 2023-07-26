const mongoose = require('mongoose');

const socialInfoSchema = new mongoose.Schema({
    userId: {
        type:String
            },
    instagram: {
        type: String,
    },
    tiktok: {
        type: String,
    },
    youtube: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    pinterest: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    blog: {
        type: String,
    },
    
});

module.exports = mongoose.model('social_information', socialInfoSchema);