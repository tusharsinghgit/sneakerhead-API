const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const Schema = mongoose.Schema;

const cartSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'Please Provide User ID'],
        ref: 'User'
    },

    product_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'Please Provide Product ID'],
        ref: 'Product'
    },

    size: {
        type: String,
        required: [true, 'Please Provide Size']
    },

    quantity: {
        type: Number,
        required: [true, 'Please Provide Quantity'],
        min: [1, 'Quantity must be at least 1']
    }
});

module.exports = mongoose.model('Cart', cartSchema);
