import {knex} from "knex";
import knexConfig from './knexfile';
import {Model} from "objection";
import {config} from "dotenv";
config()

export default function setupDB() : void{
    const db = knex(knexConfig.development)
    Model.knex(db);
}