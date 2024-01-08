/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('images', (table)=>{
          table.increments('id')
          table.string('filename')
          table.string('path')
        })
        .createTable('universe', (table)=>{
          table.increments('id')
          table.uuid('publicId').defaultTo(knex.fn.uuid())
          table.string('title').notNullable()
          table.string('content').notNullable()
          table.integer('image_id').references('id').inTable('images')
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
          table.float('price', 2).notNullable()
          table.string('currency').defaultTo('USD')
          table.boolean('isInStock').defaultTo(true)

          table.integer('universe_id').references('id').inTable('universe')

          // table.integer('image_id').references('id').inTable('images')

          table.timestamps(true, true)


        })



        .createTable('tag_product', (table)=>{
          table.increments('id')
          table.integer('product_id').references('id').inTable('products')
          table.integer('tag_id').references('id').inTable('tags')
        })

        .createTable('image_product', (table)=>{
          table.increments('id')
          table.integer('product_id').references('id').inTable('products')
          table.integer('image_id').references('id').inTable('images')
        })



  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tag_product')
        .dropTableIfExists('image_product')
        .dropTableIfExists('tags')
        .dropTableIfExists('products')
        .dropTableIfExists('universe')
        .dropTableIfExists('images')
  };
  