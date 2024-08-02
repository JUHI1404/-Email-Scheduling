
const express = require("express");
const router = express.Router();
const {
  scheduleEmailHandler,
  getEmailSchedulesHandler,
  getEmailScheduleByIdHandler,
  deleteEmailScheduleByIdHandler,
} = require("../controllers/emailController");

router.post("/schedule-email", scheduleEmailHandler);
router.get("/scheduled-emails", getEmailSchedulesHandler);
router.get("/scheduled-emails/:id", getEmailScheduleByIdHandler);
router.delete("/scheduled-emails/:id", deleteEmailScheduleByIdHandler);

module.exports = router;
