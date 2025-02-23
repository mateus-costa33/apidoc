import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('documents', table => {
        table.increments('id').primary()
        table.string('nome').notNullable();
        table.string('class_doc').notNullable();
        table.string('pdf').notNullable()
    })
}
export async function down(knex: Knex){
    return knex.schema.dropTable('documents')
}