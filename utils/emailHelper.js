
const nodemailer = require("nodemailer");
const emailService = require("../services/emailService");
const cron = require("node-cron");
const { addCronTask } = require("./cronEmailTasks");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const scheduleEmail = async (data) => {
  const scheduleDoc = await emailService.createEmailSchedule(data);
  console.log("sch doc", scheduleDoc, data);
  scheduleEmailJob(data, scheduleDoc.id);
  return scheduleDoc;
};

const scheduleEmailJob = async (data, docId) => {
  const { recipient, subject, body, scheduleData, repetition } = data;

  const sendScheduledEmail = async () => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: subject,
      text: body,
    };

    try {
      console.log("I m sending email...");
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
    }
  };

  if (repetition) {
    const cronExpression = convertToCron(
      scheduleData,
      repetition.toLowerCase()
    );
    console.log("cron", cronExpression);
    const task = cron.schedule(cronExpression, sendScheduledEmail);
    addCronTask(docId, task);
  } else {
    const date = new Date(scheduleData);
    console.log("date", date);
    const cronExpression = `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${
      date.getUTCMonth() + 1
    } *`;
    const task = cron.schedule(cronExpression, sendScheduledEmail);
    addCronTask(docId, task);
  }
};

const weekToDayMap = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const convertToCron = (schedule, repetition) => {
  const { day, date, time } = schedule;
  let hour, minute;
  if (time) {
    [hour, minute] = time.split(":").map(Number);
  }

  switch (repetition) {
    case "daily":
      return `${minute} ${hour} * * *`;
    case "weekly":
      return `${minute} ${hour} * * ${weekToDayMap[day.toUpperCase()]}`;
    case "monthly":
      return `${minute} ${hour} ${date} * *`;
    case "quarterly":
      return `${minute} ${hour} ${date} */3 *`;
    // case "every-minute":  Did this to test repetition of email as I can't test if it is recurring the second time on daily, monthly,....
    //   return "* * * * *";
    default:
      return "";
  }
};

module.exports = {
  scheduleEmail,
  weekToDayMap,
};
