
const { scheduleEmail, weekToDayMap } = require("../utils/emailHelper");
const emailService = require("../services/emailService");
const scheduleEmailHandler = async (req, res) => {
  try {
    const { recipient, subject, body, day, date, time, repetition, schedule,attachments  } =
      req.body;

    if (!recipient || !subject || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!repetition) {
      if (!schedule) {
        return res
          .status(400)
          .json({ error: "Missing required field 'schedule'" });
      }
    } else if (repetition?.toLowerCase() === "weekly") {
      if (!day || weekToDayMap[day.toUpperCase()] === undefined || !time) {
        return res.status(400).json({
          error:
            "Missing required field 'day' or 'time' or provide valid value for day(Monday, Tuesday,etc.)",
        });
      }
    } else if (repetition?.toLowerCase() === "monthly") {
      if (!date || !time) {
        return res
          .status(400)
          .json({ error: "Missing required field 'date' or 'time" });
      }
    } else if (repetition?.toLowerCase() === "daily") {
      if (!time) {
        return res.status(400).json({ error: "Missing required field  'time" });
      }
    }

    const scheduleData = schedule || { day, date, time };

    const email = await scheduleEmail({
      recipient,
      subject,
      body,
      scheduleData,
      repetition,
      attachments ,
    });

    res.status(201).json(email);
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ error: "Failed to schedule email" });
  }
};

const getEmailSchedulesHandler = async (req, res) => {
  try {
    const emails = await emailService.getEmailSchedules();
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error retrieving scheduled emails:", error);
    res.status(500).json({ error: "Failed to retrieve scheduled emails" });
  }
};

const getEmailScheduleByIdHandler = async (req, res) => {
  try {
    const email = await emailService.getEmailScheduleById(req.params.id);
    if (email) {
      res.status(200).json(email);
    } else {
      res.status(404).json({ error: "Email schedule not found" });
    }
  } catch (error) {
    console.error("Error retrieving email schedule:", error);
    res.status(500).json({ error: "Failed to retrieve email schedule" });
  }
};

const deleteEmailScheduleByIdHandler = async (req, res) => {
  try {
    const data = await emailService.deleteEmailScheduleById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Email Task Deleted Successfully",
      ...data,
    });
  } catch (error) {
    console.error("Error cancelling email schedule:", error);
    res.status(500).json({ error: "Failed to cancel email schedule" });
  }
};

module.exports = {
  scheduleEmailHandler,
  getEmailSchedulesHandler,
  getEmailScheduleByIdHandler,
  deleteEmailScheduleByIdHandler,
};
