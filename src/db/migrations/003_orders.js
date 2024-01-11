/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('recipient', (table)=>{
            table.increments('id')
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('phone').notNullable()
            table.timestamps(true, true)
        })

        .createTable('orders', (table)=>{
            table.increments('id')
            table.string('status')
            table.integer('user_id').references('id').inTable('users')
            table.integer('shipping_address_id').references('id').inTable('shippingAddress')
            table.integer('recipient_id').references('id').inTable('recipient')
            table.timestamps(true, true)
        })
        .createTable('product_snapshot', (table)=>{
            table.increments('id')
            table.uuid('publicId').defaultTo(knex.fn.uuid())
            table.string('title')
            table.string('subtitle')
            table.float('price', 2).notNullable()
            table.string('currency')
            table.integer('product_id').references('id').inTable('products')
        })

        .createTable('order_items', (table)=>{
            table.increments('id')
            table.integer('order_id').references('id').inTable('orders')
            table.integer('product_id').references('id').inTable('product_snapshot')
            table.integer('quantity')
        })



};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('order_items')
        .dropTableIfExists('product_shapshot')
        .dropTableIfExists('orders')
        .dropTableIfExists('recipient')

};
