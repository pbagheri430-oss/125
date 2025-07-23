const Redis = require('redis');
let client;

function initCache() {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  client = Redis.createClient({ url });
  client.on('error', err => console.error('Redis error', err));
  client.connect();
}

async function getCache(key) {
  if (!client) return null;
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

async function setCache(key, value, ttl = 3600) {
  if (!client) return;
  await client.set(key, JSON.stringify(value), { EX: ttl });
}

module.exports = { initCache, getCache, setCache };
