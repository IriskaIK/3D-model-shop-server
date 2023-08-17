/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('universe', (table)=>{
      table.increments('id')
      table.uuid('publicId').defaultTo(knex.fn.uuid())
      table.string('title').notNullable()
      table.string('content').notNullable()
    })
    .createTable('tags', (table)=>{
      table.increments('id')
      table.uuid('publicId').defaultTo(knex.fn.uuid())
      table.string('title').notNullable()
    })
    .createTable('products', (table)=>{
      table.increments('id')
      table.uuid('publicId').defaultTo(knex.fn.uuid())
      table.string('title').notNullable()
      table.string('subtitle').notNullable()
      table.string('content').notNullable()
      table.string('price').notNullable()
      table.boolean('isInStock').notNullable()

      table.integer('universe_id').references('id').inTable('universe')
    
      table.timestamps(true, true)


    })

    .createTable('tag_product', (table)=>{
      table.increments('id')
      table.integer('product_id').references('id').inTable('products')
      table.integer('tag_id').references('id').inTable('tags')
    })



  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products').dropTableIfExists('universe').dropTableIfExists('tag')
  };
  