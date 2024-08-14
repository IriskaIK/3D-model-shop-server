import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {
    await knex.schema.createTable('shippingAddress', (table) => {
        table.increments('id')
        table.string('region')
        table.string('city')
        table.string('postOffice')
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
}
