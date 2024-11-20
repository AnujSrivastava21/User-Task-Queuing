const redis = require('../redis/redisClient');

const LIMIT_PER_SECOND = 1;
const LIMIT_PER_MINUTE = 20;

module.exports = async (user_id, callback) => {
    const now = Math.floor(Date.now() / 1000);
    const secondKey = `rate:${user_id}:second`;
    const minuteKey = `rate:${user_id}:minute`;

    const secondCount = await redis.incr(secondKey);
    if (secondCount === 1) await redis.expire(secondKey, 1);

    const minuteCount = await redis.incr(minuteKey);
    if (minuteCount === 1) await redis.expire(minuteKey, 60);

    if (secondCount > LIMIT_PER_SECOND || minuteCount > LIMIT_PER_MINUTE) {
        throw new Error('Rate limit exceeded');
    }

    await callback();
};
