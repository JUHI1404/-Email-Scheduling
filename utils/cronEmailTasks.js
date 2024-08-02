
const cronEmailTasks = new Map();

const addCronTask = (id, task) => {
  cronEmailTasks.set(id, task);
};

const removeCronTask = (id) => {
  const task = cronEmailTasks.get(id);
  console.log("task", task, cronEmailTasks);
  if (task) {
    task.stop();
    cronEmailTasks.delete(id);
  }
};

module.exports = {
  addCronTask,
  removeCronTask,
};
