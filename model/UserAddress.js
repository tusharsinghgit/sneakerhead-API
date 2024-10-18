const mongoose = require('mongoose')
const User = require('./User');

const Schema = mongoose.Schema;

const addressSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    alternatePhone: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    flatNo: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Address', addressSchema);