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

        .createTable('wishlist', (table)=>{
          table.increments('id')
          table.integer('product_id').references('id').inTable('products')
          table.integer('user_id').references('id').inTable('users')
        })
        // .createTable('orders', (table)=>{
        //   table.increments('id')
        //   table.integer('product_id').references('id').inTable('products')
        //   table.integer('user_id').references('id').inTable('users')
        //   table.timestamps(true, true)
        // })
        .createTable('cart', (table)=>{
            table.increments('id')
            table.integer('product_id').references('id').inTable('products')
            table.integer('user_id').references('id').inTable('users')
            table.integer('quantity')
        })
  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('wishlist')
        .dropTableIfExists('cart')
        .dropTableIfExists('orders')
        .dropTableIfExists('users')
        .dropTableIfExists('shippingAddress')

  };
  