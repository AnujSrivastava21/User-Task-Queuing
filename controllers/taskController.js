const fs = require('fs');
const path = require('path');

// Define the path for the log file
const logFilePath = path.join(__dirname, '../logs/taskLogs.txt');

exports.handleTask = async (req, res) => {
    const { user_id } = req.body;

    // Ensure user_id is provided in the request body
    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try {
        // Get the current date and time
        const date = new Date();
        
        // Format the date to an ISO string (standard format: YYYY-MM-DDTHH:mm:ss.sssZ)
        const formattedDate = date.toISOString();  // Example: 2024-11-20T13:20:30.000Z

        // Optionally, use a more human-readable date format
        // const formattedDate = new Intl.DateTimeFormat('en-US', {
        //     weekday: 'long',
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: 'numeric',
        //     minute: 'numeric',
        //     second: 'numeric',
        // }).format(date);

        // Log message with the correct user_id and formatted date
        const logMessage = `${formattedDate} - Task completed for user_id ${user_id}\n`;

        // Write the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing log:', err);
            }
        });

        // Respond with the task completion message
        res.status(200).json({
            message: `Task completed for user_id ${user_id}`,
            date: formattedDate
        });

    } catch (err) {
        // Handle any errors during task processing
        res.status(500).json({
            error: 'Failed to process task',
            details: err.message
        });
    }
};
