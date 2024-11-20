const rateLimiter = require('../middlewares/rateLimiter');
const taskQueue = require('../models/queue');  // Import queue

exports.handleTask = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        // Rate limit check
        await rateLimiter(user_id, async () => {
            // If rate limit exceeded, add the task to the queue
            await taskQueue.addTask(user_id);
            res.status(200).json({ message: `Task added to the queue for user_id ${user_id}` });
        });
    } catch (err) {
        res.status(429).json({ error: 'Rate limit exceeded, task queued' });
    }
};
