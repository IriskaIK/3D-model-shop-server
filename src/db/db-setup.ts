import {knex} from "knex";
import knexConfig from './knexfile';
import {Model} from "objection";


export default function setupDB() : void{
    const db = knex(knexConfig.development)
    Model.knex(db);
}