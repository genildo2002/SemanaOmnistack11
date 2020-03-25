const knex = require('knex');
const configuration = require('../../knexfile.js')  // importa o arquivo deconfigurações gerados pelo knex

const connection = knex(configuration.development);
module.exports = connection;

