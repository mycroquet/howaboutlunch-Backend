
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', function(table) {
    table.increments();
    table.text('title').notNullable();
    table.text('poll_url').unique().notNullable();
    table.boolean('enabled').notNullable();
    table.integer('user_id').references('user.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('poll');
};
