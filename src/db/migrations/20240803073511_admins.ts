import { Knex } from 'knex';

export async function up(knex : Knex): Promise<void> {

    await knex.schema.createTable('roles', (table)=> {
        table.increments('id')
        table.string('role').notNullable()
        table.boolean('right_to_edit').notNullable()
        table.boolean('right_to_delete').notNullable()
        table.boolean('right_to_create').notNullable()
        table.boolean('superuser').notNullable()
    })


    await knex.schema.createTable('admins', (table) => {
        table.increments('id')
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.integer('role_id').references('id').inTable('roles')
        table.string('type')
    });


}

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTable('admins');
    await knex.schema.dropTable('roles');
}
