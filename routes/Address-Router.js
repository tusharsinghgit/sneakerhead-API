const express = require('express');
const router = express.Router();
const AddressController = require('../controller/AddressController');

router.post('/', AddressController.addAddress);

router.get('/user/:user_id', AddressController.getAddress);

router.get('/:id', AddressController.getAddressById);

router.put('/:id', AddressController.updateAddress);

module.exports = router;