const cluster = require('cluster');
const os = require('os');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < 2; i++) { // This spawns two workers
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} exited`);
        cluster.fork(); // Restart the worker if it dies
    });
} else {
    const app = express();
    app.use(express.json());
    app.use('/api/tasks', taskRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker process ${process.pid} is running on port ${PORT}`);
    });
}
