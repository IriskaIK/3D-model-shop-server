import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {
    await knex.schema.createTable('recipient', (table) => {
        table.increments('id')
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('phone').notNullable()
        table.timestamps(true, true)
    });
    await knex.schema.createTable('orders', (table) => {
        table.increments('id')
        table.string('status')
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.integer('shipping_address_id').references('id').inTable('shippingAddress')
        table.integer('recipient_id').references('id').inTable('recipient')
        table.timestamps(true, true)
    })
    await knex.schema.createTable('product_snapshot', (table) => {
        table.increments('id')
        table.string('title')
        table.string('subtitle')
        table.float('price', 2).notNullable()
        table.string('currency')
        table.integer('product_id').references('id').inTable('products')
    })
    await knex.schema.createTable('order_items', (table) => {
        table.increments('id')
        table.integer('order_id').references('id').inTable('orders')
        table.integer('product_id').references('id').inTable('product_snapshot')
        table.integer('quantity')
    })
}

export async function down(knex: Knex) : Promise<void> {

    await knex.schema.dropTable('order_items');
    await knex.schema.dropTable('product_snapshot');
    await knex.schema.dropTable('orders');
    await knex.schema.dropTable('recipient');
}
