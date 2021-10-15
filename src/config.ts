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
  email: {
    apiKey: process.env.EMAIL_API_KEY || '',
    sender: {
      name: 'The PainApp',
      email: 'davidclausen2051+thepainapp@gmail.com',
    },
  },
  env: {
    isProduction: process.env.NODE_ENV === 'production',
  },
  jwt: {
    expiresIn: 15,
    secret: JWT_SECRET,
  },
};
