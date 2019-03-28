const knex = require('knex');

const knexConfig = require('../knexfile.js');

// pick the development configuration
module.exports = knex(knexConfig.development);
