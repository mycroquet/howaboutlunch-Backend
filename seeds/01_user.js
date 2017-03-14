const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user').insert({
                    id: 1,
                    first_name: 'Michael',
                    last_name: 'Roque',
                    email: 'mycroquet@gmail.com',
                    password: bcrypt.hashSync('bacon', 10),
                    company: 'Galvanize'
                }),
                knex('user').insert({
                    id: 2,
                    first_name: 'CJ',
                    last_name: 'Reynolds',
                    email: 'theceej@gmail.com',
                    password: bcrypt.hashSync('kickflip', 10),
                    company: 'Galvanize'
                })
            ])
        });
};
