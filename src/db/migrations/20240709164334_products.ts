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
        table.uuid('publicId').defaultTo(knex.fn.uuid()) // TODO: change to slug
        table.string('title').notNullable()
        table.string('content').notNullable()
        table.integer('image_id').references('id').inTable('images')
        table.timestamps(true, true)
    })
    await knex.schema.createTable('tags', (table) => {
        table.increments('id')
        table.uuid('publicId').defaultTo(knex.fn.uuid())
        table.string('title').notNullable()
        table.timestamps(true, true)
    })
    await knex.schema.createTable('products', (table) => {
        table.increments('id')

        table.uuid('publicId').defaultTo(knex.fn.uuid()) // TODO: change to slug
        table.string('title').notNullable()
        table.string('subtitle').notNullable()
        table.string('content').notNullable()
        table.float('price', 2).notNullable()
        table.string('currency').defaultTo('USD')
        table.boolean('isInStock').defaultTo(true)

        table.integer('category_id').references('id').inTable('category')

        table.timestamps(true, true)
    })
    await knex.schema.createTable('tag_product', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products')
        table.integer('tag_id').references('id').inTable('tags')
    })
    await knex.schema.createTable('image_product', (table) => {
        table.increments('id')
        table.integer('product_id').references('id').inTable('products')
        table.integer('image_id').references('id').inTable('images')
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
