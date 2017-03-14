exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3;')
        .then(function() {
            // Inserts seed entries
            return knex('table_name').insert([{
                id: 1,
                colName: 'rowValue1'
            }, {
                id: 2,
                colName: 'rowValue2'
            }, {
                id: 3,
                colName: 'rowValue3'
            }]);
        });
};
