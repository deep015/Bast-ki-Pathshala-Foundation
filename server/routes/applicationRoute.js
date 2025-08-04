const express = require("express");
const { registerApplicants, getApplicants } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerApplicants);
router.get("/", protect, getApplicants); // Admin only

module.exports = router;
