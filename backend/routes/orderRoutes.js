const express = require('express');
const router = express.Router();
const orderCTRL = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, orderCTRL.addOrderItems)
router.route('/myorders').get(protect, orderCTRL.getMyOrders)
router.route('/:id').get(protect, orderCTRL.getOrderByID)
router.route('/:id/pay').put(protect, orderCTRL.updateOrderToPaid)

module.exports = router;

