var knex = require('../db/db_connection')

module.exports = {

    userProfile: function(email) {
        return knex('user')
            .join('poll', 'poll.user_id', '=', 'user.id')
            .select('user.id', 'user.first_name', 'user.last_name', 'user.email', 'user.company',
                'poll.user_id', 'poll.title')
            .where('user.email', 'mycroquet@gmail.com')
    },
    validSignUp: function(email) {
        return knex('user').where({
            email: email
        }).first()
    },
    validLogIn: function(email, password) {
        return knex('user').where({
            email: email
        })
    },
    getUser: function(userID) {
        return knex('user').select('email').where('id', 1)
    },
    getUserByEmail: function(email) {
        return knex('user').first().where('email', email);
    },
    createUser: function(userInfo) {
        if (userInfo.email == 'user.email') {
            return Promise.reject({
                constraint: 'Email already exists.'
            });
        } else {
            return knex('user').returning('id').insert(userInfo)
        }
    }

}
