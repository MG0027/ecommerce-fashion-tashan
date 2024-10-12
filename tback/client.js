const { Redis } = require('ioredis');

const client = new Redis({
  host: process.env.REDIS_HOST || 'localhost', 
  port: process.env.REDIS_PORT || 6379,        
  password: process.env.REDIS_PASSWORD || '', 
  db: process.env.REDIS_DB || 0               
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = client;