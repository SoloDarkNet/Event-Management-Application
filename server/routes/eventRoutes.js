const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

const { createEvent, getEvents } = require("../controllers/eventController");

router.post("/", verifyToken, createEvent);
router.get("/", verifyToken, getEvents);

module.exports = router;
