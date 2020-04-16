const db = require('../data/db-config.js');

module.exports = {
    all,
    getById,
    create,
    update,
    dele
}

function all() {
    return db('users');
}

function getById(id) {
    return db('users').where({ id: id }).first();
}

function create(user) {
    return db('users')
        .insert(user, 'id')
            .then(([id]) => {
                return getById(id);
            });
}

function update(id, changes) {
    return db('users')
        .where({ id }).update(changes)
            .then(() => {
                return getById(id);
        });
}

function dele(id) {
    return db('users').where({ id }).del();
}