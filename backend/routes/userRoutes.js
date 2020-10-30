const express = require('express');
const router = express.Router();
const authCTRL = require('../controllers/userController');
const protect = require('../middleware/authMiddleware')

router.route('/').post(authCTRL.registerUser)
router.route('/login').post(authCTRL.authUser)
router.route('/profile').get(protect, authCTRL.getUserProfile).put(protect, authCTRL.updateUserProfile)


module.exports = router;