import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('listings_db', 'siddharth', 'sidd', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to true if you want to see raw SQL queries
});

export default sequelize;
