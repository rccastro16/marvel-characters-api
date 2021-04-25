import redis from 'redis';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const CLIENTURL = process.env.REDIS_URL || 'redis://localhost:6379';

export const client = redis.createClient(CLIENTURL);

export const getRedisAsync = promisify(client.get).bind(client);
