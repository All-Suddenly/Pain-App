import 'dotenv/config';

const {
  MONGO_DB_NAME = 'application-local',
  MONGO_URL = 'mongodb://localhost',
  JWT_SECRET = 'SUPER_SECRET',
} = process.env;

export const config = {
  auth: {
    saltRounds: 10,
  },
  db: {
    name: MONGO_DB_NAME,
    url: MONGO_URL,
  },
  jwt: {
    expiresIn: 15,
    secret: JWT_SECRET,
  },
};
