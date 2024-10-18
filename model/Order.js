const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ['COD', 'Card'],
        required: true
    },

    cartItems: [
        { // Array of cart items

            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true 
            },

            quantity: {
                type: Number,
                required: true
            },

            size: {
                type: String,
                required: true
            },
        }
    ],

    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    }, // Reference to the Address

    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;