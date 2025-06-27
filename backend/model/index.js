import { Sequelize } from 'sequelize';
import dbConfig from '../config/config.js';
import ListingModel from './listing.js';

const sequelize = new Sequelize(dbConfig.development);
const Listing = ListingModel(sequelize, Sequelize);

export { sequelize, Listing };