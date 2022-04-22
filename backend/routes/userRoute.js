const { Router } = require("express");
const router = Router();
const protect = require("../middleware/authMiddleware");

const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
