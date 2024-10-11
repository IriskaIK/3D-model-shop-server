import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {
    await knex.schema.createTable('order_status', (table) => {
        table.increments('id');
        table.string('status');
    })


    await knex.schema.createTable('recipient', (table) => {
        table.increments('id')
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('phone').notNullable()
        table.timestamps(true, true)
    });
    await knex.schema.createTable('recipient_address', (table) => {
        table.increments('id')
        table.string('address').notNullable();
        table.integer('region_id').references('id').inTable('regions')
        table.integer('city_id').references('id').inTable('cities')
        table.integer('postOffice_id').references('id').inTable('postOffices')
    })


    await knex.schema.createTable('orders', (table) => {
        table.increments('id')
        table.float('total_price', 2)
        table.float('delivery_price', 2).defaultTo(0)


        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.integer('status_id').references('id').inTable('order_status')
        table.integer('recipient_address_id').references('id').inTable('recipient_address')
        table.integer('recipient_id').references('id').inTable('recipient')

        table.timestamps(true, true)
    })
    await knex.schema.createTable('product_snapshot', (table) => {
        table.increments('id')
        table.string('title')
        table.string('subtitle')
        table.float('price', 2).notNullable()
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
    await knex.schema.dropTable('recipient_address')
}
