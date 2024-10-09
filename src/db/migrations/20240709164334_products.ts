import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {
    await knex.schema.createTable('images', (table) => {
        table.increments('id')
        table.string('filename')
        table.string('path')
        table.timestamps(true, true)
    });
    await knex.schema.createTable('category', (table) => {
        table.increments('id')
        table.string('title').notNullable()
        table.string('content').notNullable()
        table.integer('image_id').references('id').inTable('images').onDelete('SET NULL')
        table.timestamps(true, true)
    })
    await knex.schema.createTable('tags', (table) => {
        table.increments('id')
        table.string('title').notNullable()
        table.timestamps(true, true)
    })
    await knex.schema.createTable('products', (table) => {
        table.increments('id')

        table.string('slug').unique()
        table.string('title').notNullable()
        table.string('subtitle').notNullable()
        table.string('content').notNullable()
        table.float('price', 2).notNullable()
        table.boolean('isInStock').defaultTo(true)

        table.integer('category_id').references('id').inTable('category').onDelete('SET NULL')

        table.timestamps(true, true)
    })
    await knex.schema.createTable('tag_product', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products').onDelete('CASCADE')
        table.integer('tag_id').references('id').inTable('tags').onDelete('SET NULL')
    })
    await knex.schema.createTable('image_product', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products').onDelete('CASCADE')
        table.integer('image_id').references('id').inTable('images').onDelete('SET NULL')
    })
}

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTable('tag_product');
    await knex.schema.dropTable('image_product');
    await knex.schema.dropTable('tags');
    await knex.schema.dropTable('products');
    await knex.schema.dropTable('category');
    await knex.schema.dropTable('images');
}
