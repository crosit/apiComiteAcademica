import "dotenv/config";
import process from "process";

const config = {
  PORT: process.env.PORT,
  FRONT_URL: process.env.FRONT_URL,
  nodemailer: {
    NODEMAILER_ADRRESS: process.env.NODEMAILER_ADRRESS,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_ENCRYPTION: process.env.NODEMAILER_ENCRYPTION,
    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_MAILER: process.env.NODEMAILER_MAIL,
    NODEMAILER_NAME: process.env.NODEMAILER_NAME,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  },
  authentication: {
    jwt: {
      JWT_SECRET: process.env.JWT_SECRET,
    },
  },
  firebase: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  cache: {
    redis: {
      REDIS_HOSTNAME: process.env.REDIS_HOSTNAME || "",
      REDIS_DB: process.env.REDIS_DB || 0,
      REDIS_PORT: +process.env.REDIS_PORT! || 6379,
    },
  },
  database: {
    comite: {
      COMITE_DB_CONNECTION: process.env.COMITE_DB_CONNECTION,
      COMITE_DB_HOST: process.env.COMITE_DB_HOST,
      COMITE_DB_PORT: process.env.COMITE_DB_PORT,
      COMITE_DB_USERNAME: process.env.COMITE_DB_USERNAME,
      COMITE_DB_PASSWORD: process.env.COMITE_DB_PASSWORD,
      COMITE_DB_DATABASE: process.env.COMITE_DB_DATABASE,
      COMITE_ENTITIES: process.env.COMITE_ENTITIES,
      COMITE_MIGRATIONS: process.env.COMITE_MIGRATIONS,
      COMITE_MIGRATIONS_DIR: process.env.COMITE_MIGRATIONS_DIR,
      COMITE_MIGRATIONS_TABLE_NAME: process.env.COMITE_MIGRATIONS_TABLE_NAME,
    },
  },
};

export default config;
