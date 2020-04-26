import { Sequelize, } from 'sequelize';

/**
 * connextion to DB
 * @author siemah
 * @version 1.0.0
 * @see mongoose docs
 * @return Promise<string|any>
 */
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_HOST_PORT } = process.env;
// console.log(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_NAME}`)
const _db = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_NAME}`, {
  logging: false,
});

export default _db;