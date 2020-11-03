const express = require('express');
const router = express.Router();
const orderCTRL = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware')

router.route('/').post(protect, orderCTRL.addOrderItems)

module.exports = router;

