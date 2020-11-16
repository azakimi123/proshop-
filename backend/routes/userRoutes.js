const express = require("express");
const router = express.Router();
const authCTRL = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
// const admin  = require('../middleware/authMiddleware')

router.route("/").get(protect, admin, authCTRL.getUsers);
router.route("/").post(authCTRL.registerUser);
router.route("/login").post(authCTRL.authUser);
router
  .route("/profile")
  .get(protect, authCTRL.getUserProfile)
  .put(protect, authCTRL.updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, authCTRL.deleteUser)
  .get(protect, admin, authCTRL.getUserById)
  .put(protect, admin, authCTRL.updateUser);

module.exports = router;
