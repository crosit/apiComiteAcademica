import IoRedis from "ioredis";
import config from "../envs";

export default new IoRedis({
  port: +config.cache.redis.REDIS_PORT,
  host: config.cache.redis.REDIS_HOSTNAME,
  db: +config.cache.redis.REDIS_DB,
});
