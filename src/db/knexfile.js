// Update with your config settings.




const {knexSnakeCaseMappers} = require('objection')
const {database, user, password} = require('../configs/constants.config')
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  
  development: {
    client: 'postgresql',
    connection: {
      database: database || 'testrun',
      user:     user || 'postgres',
      password: password || '8339'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds : {
      directory: './seeds',
      
    },
    ...knexSnakeCaseMappers
  }

};
