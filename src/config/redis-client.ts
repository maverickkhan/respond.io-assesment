import { createClient, RedisClientOptions } from 'redis';
import { REDIS_URL } from '.';

const clientOptions: RedisClientOptions = {
  url: REDIS_URL,
};

export const redisClient = createClient(clientOptions);
redisClient.connect();
