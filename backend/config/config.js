import dotenv from 'dotenv';
dotenv.config();

export default {
    development: {
      username: process.env.DB_USERNAME,
      password: 'sidd',
      database: 'listings_db',
      host: '127.0.0.1',
      dialect: 'postgres'
    }
  };