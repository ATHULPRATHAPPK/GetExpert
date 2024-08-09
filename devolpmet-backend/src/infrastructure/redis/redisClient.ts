// src/infrastructure/redis/redisClient.ts

import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: 'localhost', // Redis server host
    port: 6379,        // Redis server port
  },
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis when the application starts
redisClient.connect().catch(console.error);

export { redisClient };
