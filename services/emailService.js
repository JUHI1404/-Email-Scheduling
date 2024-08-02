
const { PrismaClient } = require("@prisma/client");
const { removeCronTask } = require("../utils/cronEmailTasks");
const prisma = new PrismaClient();

const createEmailSchedule = async (data) => {
  try {
    const { recipient, subject, body, scheduleData, repetition,attachments  } = data;

    if (!recipient || !subject || !body || !scheduleData) {
      throw new Error("Missing required fields");
    }

    console.log("rec", repetition);
    return await prisma.emailSchedule.create({
      data: repetition
        ? {
            recipient,
            subject,
            body,
            ...scheduleData,
            repetition,
            attachments ,
          }
        : {
            recipient,
            subject,
            body,
            schedule: scheduleData,
            repetition,
            attachments ,
          },
    });
  } catch (error) {
    console.error("Error creating email schedule:", error.message);
    throw error;
  }
};

const getEmailSchedules = async () => {
  try {
    return await prisma.emailSchedule.findMany();
  } catch (error) {
    console.error("Error retrieving email schedules:", error.message);
    throw error;
  }
};

const getEmailScheduleById = async (id) => {
  try {
    return await prisma.emailSchedule.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error retrieving email schedule by ID:", error.message);
    throw error;
  }
};

const deleteEmailScheduleById = async (id) => {
  try {
    removeCronTask(id);
    return await prisma.emailSchedule.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting email schedule by ID:", error.message);
    throw error;
  }
};

module.exports = {
  createEmailSchedule,
  getEmailSchedules,
  getEmailScheduleById,
  deleteEmailScheduleById,
};
