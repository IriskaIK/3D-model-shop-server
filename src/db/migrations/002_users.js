/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('shippingAddress', (table)=>{
      table.increments('id')
      table.string('region')
      table.string('city')
      table.string('postOffice')
    })


    .createTable('users', (table)=>{
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('last_name')
      table.string('phone')
      table.integer('shippingAddress_id').references('id').inTable('shippingAddress')
      table.integer('image_id').references('id').inTable('images')

      table.timestamps(true, true)
    })
  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('shippingAddress')
  };
  