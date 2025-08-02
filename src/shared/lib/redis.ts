import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in environment variables');
}

export const redis = new Redis(redisUrl);
export const redisPub = new Redis(redisUrl);
export const redisSub = new Redis(redisUrl);
