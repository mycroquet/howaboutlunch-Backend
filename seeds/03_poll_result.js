
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "poll_result"; ALTER SEQUENCE poll_result_id_seq RESTART WITH 12;')
      .then(function() {
          return Promise.all([
              // Inserts seed entries
              knex('poll_result').insert({
                  id: 1,
                  name: 'Highland Tap and Burger',
                  votes: 6,
                  place_id: 'ChIJ7bj3tZN4bIcRwAQ9GQZpKgU',
                  poll_id: 1
              }),
              knex('poll_result').insert({
                  id: 2,
                  name: 'Hampton Inn & Suites Denver-Speer Boulevard',
                  votes: 1,
                  place_id: 'ChIJMza0YpZ4bIcRNh6XG4d8N6U',
                  poll_id: 1
              }),
              knex('poll_result').insert({
                  id: 3,
                  name: 'Linger',
                  votes: 4,
                  place_id: 'ChIJF4sShZR4bIcRZCQ8ZRvoh_c',
                  poll_id: 1
              }),
              knex('poll_result').insert({
                  id: 4,
                  name: 'Lola Coastal Mexican',
                  votes: 7,
                  place_id: 'ChIJkwnBk5R4bIcRs57q9ndgEhM',
                  poll_id: 1
              }),
              knex('poll_result').insert({
                  id: 5,
                  name: 'Spuntino',
                  votes: 2,
                  place_id: 'ChIJa5nUZJB4bIcR_BbtpGAZsM8',
                  poll_id: 1
              }),
              knex('poll_result').insert({
                  id: 6,
                  name: 'Old Major',
                  votes: 5,
                  place_id: 'ChIJk2c_7pJ4bIcRColVfqm4jBM',
                  poll_id: 2
              }),
              knex('poll_result').insert({
                  id: 7,
                  name: 'Uncle',
                  votes: 4,
                  place_id: 'ChIJT-fZtZN4bIcRF5Vshr6ctQs',
                  poll_id: 2
              }),
              knex('poll_result').insert({
                  id: 8,
                  name: 'Ale House at Amato\'\s',
                  votes: 2,
                  place_id: 'ChIJ27iX0pR4bIcRJt9bqBfafdU',
                  poll_id: 2
              }),
              knex('poll_result').insert({
                  id: 9,
                  name: 'Williams & Graham',
                  votes: 1,
                  place_id: 'ChIJ-yVzEpN4bIcRn8UiXo68tUo',
                  poll_id: 2
              }),
              knex('poll_result').insert({
                  id: 10,
                  name: 'Forest Room 5',
                  votes: 5,
                  place_id: 'ChIJ8WhM_ZR4bIcRdta-Gv-W0uU',
                  poll_id: 2
              }),
              knex('poll_result').insert({
                  id: 11,
                  name: 'duo Restaurant',
                  votes: 3,
                  place_id: 'ChIJjcsDn5F4bIcRRxZVrn7MZ7M',
                  poll_id: 2
              })
          ])
      });
};
