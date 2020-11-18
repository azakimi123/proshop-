const express = require('express');
const router = express.Router();
const orderCTRL = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').post(protect, orderCTRL.addOrderItems).get(protect, admin, orderCTRL.getOrders)
router.route('/myorders').get(protect, orderCTRL.getMyOrders)
router.route('/:id').get(protect, orderCTRL.getOrderByID)
router.route('/:id/pay').put(protect, orderCTRL.updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, orderCTRL.updateOrderToDelivered)

module.exports = router;

