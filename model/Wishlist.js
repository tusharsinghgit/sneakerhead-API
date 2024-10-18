const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({

    user_id:{
        type: Schema.Types.ObjectId,
        required: [true, 'Please Enter User ID'],
        ref : 'User'
    },

    product_id: {
        type: Schema.Types.ObjectId,
        required :[true, 'Please Enter Product ID'],
        ref : 'Product', 
    }
})

module.exports = mongoose.model('Wishlist', wishlistSchema);