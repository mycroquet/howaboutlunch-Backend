
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function(table) {
    table.increments();
    table.text('first_name');
    table.text('last_name');
    table.text('email').unique().notNullable();
    table.text('company');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
