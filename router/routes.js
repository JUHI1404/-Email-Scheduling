const express = require("express");
const router = express.Router();
const {
  scheduleEmailHandler,
  getEmailSchedulesHandler,
  getEmailScheduleByIdHandler,
  deleteEmailScheduleByIdHandler,
} = require("../controllers/emailController");

router.post("/schedule-email");
router.get("/scheduled-emails");
router.get("/scheduled-emails/:id");
router.delete("/scheduled-emails/:id");

module.exports = router;