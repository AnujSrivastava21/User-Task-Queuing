const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
    reconnectOnError: (err) => {
        console.error('Redis error:', err);
        return true;
    }
});

module.exports = redis;
