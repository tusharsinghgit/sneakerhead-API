const express = require('express');
const router = express.Router();
const WishlistController = require('../controller/WishlistController');

router.get('/:user_id', WishlistController.getWishlistItems);
router.post('/', WishlistController.addToWishlist);
router.delete('/', WishlistController.removeWishlist);

module.exports = router;