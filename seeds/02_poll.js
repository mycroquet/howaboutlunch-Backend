exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "poll"; ALTER SEQUENCE poll_id_seq RESTART WITH 3;')
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('poll').insert({
                    id: 1,
                    title: 'FriYay',
                    poll_url: 'blank',
                    enabled: 'Yes',
                    user_id: 1
                }),
                knex('poll').insert({
                    id: 2,
                    title: 'Sunday Funday',
                    poll_url: 'blank2',
                    enabled: 'No',
                    user_id: 2
                })
            ])
        });
};
