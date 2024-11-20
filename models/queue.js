const Queue = require('bull');
const taskQueue = new Queue('taskQueue');

// Processing the task
taskQueue.process(async (job) => {
    const { user_id } = job.data;
    console.log(`Processing task for user_id ${user_id}`);
    // Process the task (e.g., log task, update database)
});

module.exports = {
    addTask: (user_id) => taskQueue.add({ user_id })
};
