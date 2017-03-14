
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll_result', function(table) {
    table.increments();
    table.text('name').notNullable();
    table.integer('votes').notNullable();
    table.string('place_id').notNullable();
    table.integer('poll_id').notNullable().references('poll.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('poll_result');
};
