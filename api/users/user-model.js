const db = require('../../data/db-config.js')

module.exports = {
  findPosts,
  find,
  findById,
  add,
  update,
  remove
}

function findPosts(user_id) {
  /*
    Implement!
  */
}

function find() {
  return db('users')
  /*
    Improve so it resolves this structure:

    [
        {
            "id": 1,
            "username": "lao_tzu",
            "post_count": 6
        },
        {
            "id": 2,
            "username": "socrates",
            "post_count": 3
        },
        etc
    ]
  */
}

function findById(id) {
  return db('users').where({ id }).first()
  /*
  Improve so it resolves this structure:

    {
      "id": 2,
      "username": "socrates"
      "posts": [
        {
          "id": 7,
          "contents": "Beware of the barrenness of a busy life."
        },
        etc
      ]
    }
  */
}

function add(user) {
  // returns an array with new user id
  return db('users').insert(user)
}

function update(changes, id) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id)
    })
}

function remove(id) {
  // returns removed count
  return db('users').where({ id }).del()
}
