import {knexSnakeCaseMappers} from 'objection';
import type { Knex } from 'knex';

import credentials from '../configs/constants.config';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig: { [key: string]: Knex.Config } =  {

  development: {
    client: 'postgresql',
    connection: {
      database: credentials.database || '3dModelShopDB',
      user:     credentials.user || 'postgres',
      password: credentials.password || '8339',
      host : 'pgdb'
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
export default knexConfig;