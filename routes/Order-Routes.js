const express = require('express');
const orderController = require('../controller/OrderController');
const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/', orderController.addOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.get('/:orderId', orderController.getOrderById);

module.exports = router;