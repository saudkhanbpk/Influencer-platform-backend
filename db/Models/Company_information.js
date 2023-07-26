const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
    userId: {
type:String
    },
    niche: {
        type: String,
    },
    budget: {
        type: String,
    },
    companysize: {
        type: String,
    },
    companyfounded: {
        type: String,
    },
    bio: {
        type: String,
    },

});

module.exports = mongoose.model('company_information', companyInfoSchema);