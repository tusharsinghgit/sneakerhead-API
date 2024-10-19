const express = require('express');
const productRoutes = require('./Product-Routes');
const userRoutes = require('./User-Routes');
const cartRoutes = require('./Cart-Routes');
const wishlistRoutes = require('./Wishlist-Routes');
const addressRoutes = require('./Address-Router');
const paymentRoutes  = require('./Payment-Router');
const orderRoutes = require('./Order-Routes');

const router = express.Router();

router.use('/products',productRoutes);
router.use('/auth', userRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/addresses', addressRoutes);
router.use('/payment', paymentRoutes);
router.use('/orders', orderRoutes);

module.exports = router;