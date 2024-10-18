const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController');

router.get('/:user_id', CartController.getAllCartItems);
router.post('/', CartController.addCartItem);
router.put('/', CartController.updateCartItem);
router.delete('/', CartController.removeCartItem);
router.delete('/clear/:user_id', CartController.clearCart);


module.exports = router;