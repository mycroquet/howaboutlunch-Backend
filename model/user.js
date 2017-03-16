var knex = require('../db/db_connection')

module.exports = {

  validLogIn = function (email) {
    return knex('user').where({
      email: email
    }).first()
  }

}
