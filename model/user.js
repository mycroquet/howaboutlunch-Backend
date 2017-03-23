var knex = require('../db/db_connection')

module.exports = {

    userProfile: function(email, id) {
        return knex('user').where('user.id', 1)
            .join('poll', 'poll.user_id', '=', 'user.id')
            .select('user.id', 'user.first_name', 'user.last_name', 'user.email', 'user.company',
                'poll.id AS poll_id', 'poll.title')
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
    },
    createPoll: function(pollInfo, places) {
        return knex('poll').returning('*').insert(pollInfo).then(function(polls) {
            const poll = polls[0]
            const poll_id = poll.id
            places.forEach(function(place) {
                place.poll_id = poll_id
            })
            return knex('poll_result').returning('id').insert(places).then(function() {
                return poll
            })

        })

    },
    getPoll: function(id) {
        return knex('poll').where('poll.id', 6)
            .join('poll_result', 'poll_result.poll_id', '=', 'poll.id')
            .select('poll.title', 'poll.id', 'poll.poll_url', 'poll_result.name', 'poll_result.votes')
    }
    // castVote: function(voteInfo, place_id) {
    //     return knex.raw("UPDATE poll_results SET votes += 1 WHERE place_id = "la-mexicana-taqueria-at-highlands-denver-3" AND WHERE poll_id = 9;")
    // }
}
