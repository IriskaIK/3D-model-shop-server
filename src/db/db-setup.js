const { knex } = require("knex")
const { development } = require('./knexfile')
const { Model } = require("objection")


function setupDB(){
    const db = knex(development)
    Model.knex(db);
}

module.exports = setupDB