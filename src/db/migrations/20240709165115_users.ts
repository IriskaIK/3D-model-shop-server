import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {

    await knex.schema.createTable('regions', (table) => {
        table.increments('id');
        table.string('name');
    })

    await knex.schema.createTable('cities', (table) => {
        table.increments('id');
        table.string('name');
        table.integer('region_id').references('id').inTable('regions');
    })

    await knex.schema.createTable('postOffices', (table) => {
        table.increments('id');
        table.string('address');
        table.integer('city_id').references('id').inTable('cities');
    })


    await knex.schema.createTable('shippingAddress', (table) => {
        table.increments('id')
        table.string('full_address')

        table.integer('region_id').references('id').inTable('regions');
        table.integer('city_id').references('id').inTable('cities');
        table.integer('postOffice_id').references('id').inTable('postOffices');
    });
    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('first_name').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('last_name')
        table.string('phone')
        table.integer('shippingAddress_id').references('id').inTable('shippingAddress')
        table.integer('image_id').references('id').inTable('images')

        table.string('type')
        table.timestamps(true, true)
    })
    await knex.schema.createTable('wishlist', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products')
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    })
    await knex.schema.createTable('cart', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products')
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.integer('quantity')
    })
}

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTable('wishlist');
    await knex.schema.dropTable('cart');
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('shippingAddress');
    await knex.schema.dropTable('postOffices');
    await knex.schema.dropTable('cities');
    await knex.schema.dropTable('regions');
}
