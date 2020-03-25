// Responsável pela criação databela
exports.up = function(knex) {
    return knex.schema.createTable('ongs',function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsup').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();      
    });
};

// Excluir a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
};

//Executar a migration
//npx knex migrate:latest
//npx  knex migrate:roolback    //Executar o método Down - Deletar