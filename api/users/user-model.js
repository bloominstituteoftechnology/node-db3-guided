const db = require('../../data/db-config.js')

module.exports = {
  findPosts,
  find,
  findById,
  add,
  remove
}

function findPosts(user_id) {
  return db('posts')
    .select('contents', 'id as post_id', 'username')
    .where('user_id', user_id)
    // JOIN users ON posts.user_id = users.id
    .join('users', 'posts.user_id', 'users.id')
  /*
    Implement so it resolves this structure:

    [
      {
          "post_id": 10,
          "contents": "Trusting everyone is...",
          "username": "seneca"
      },
      etc
    ]
  */
}

function find() {
  return db('users')
  /*
    Improve so it resolves this structure:

    [
        {
            "user_id": 1,
            "username": "lao_tzu",
            "post_count": 6
        },
        {
            "user_id": 2,
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
      "user_id": 2,
      "username": "socrates"
      "posts": [
        {
          "post_id": 7,
          "contents": "Beware of the barrenness of a busy life."
        },
        etc
      ]
    }
  */
}

function add(user) {
  return db('users')
    .insert(user)
    .then(([id]) => { // eslint-disable-line
      return findById(id)
    })
}

function remove(id) {
  // returns removed count
  return db('users').where({ id }).del()
}
