const express = require("express");
const { registerApplicant, getApplicants } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerApplicant);
router.get("/", protect, getApplicants); // Admin only

module.exports = router;
