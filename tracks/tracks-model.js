// db is a configured instance of knex that knows how to talk to the database
const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('tracks');
}

function findById(id) {
  return db('tracks')
    .where({ id })
    .first();
}

function add(track) {
  // passing 'id' as the second parameter is recommended to ensure the id is returned
  // when connecting to other database management systems like Postgres
  return db('tracks')
    .insert(track, 'id')
    .then(([id]) => {
      return findById(id);
    });
}

function update(id, changes) {
  return db('tracks')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db('tracks')
    .where({ id })
    .del();
}
