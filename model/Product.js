const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    name:{

        type:String,
        required: [true, 'Please Provide Name'],
    },

    brand:{

        type:String,
        required: [true, 'Please Provide Brand'],
    },

    description:{

        type:String,
        required: [true, 'Please Provide Description'],

    },

    price: {
        type:Number,
        required: [true, 'Please Provide Price'],
    },

    images: {

        type:[String],
        required: [true, 'Please Provide Images'],
    },

    sizes: [
        {
            size : {
                type: String,
                required: [true, 'Please Provide Size'],
            },
            quantity: {
                type: Number,
                required: [true, 'Please Provide Quantity'],
                min: [0, 'Quantity cannot be negative'],
            },
        },
    ],

    type: {
        type:String,
        enum:['common','collab'],
        default: 'common',
    },
});

module.exports = mongoose.model('Product',productSchema);