const db = require('../data/db-config.js');

function find() {
    return db('users');
}

function findById(id) {
    return db('users').where({ id });
}

//----------------------------------------------------------------------------//
// findByIdAlt()
//
// An alternative way to find by id ... instead of returning an array of
// results, when we are looking for only one object, we can call .first() to
// return the "first" (probably the only) item in the resulting array.
//----------------------------------------------------------------------------//
// the .first() method provides a simple way to detect empty results. .where()
// returns an array, but it could be an empty array. Using .first() returns the
// first object in the array, and if the array is empty, the first object is
// "null", which can be an easy test for "not the data I was looking for".
//
// you could also test the length of the array, and there are other methods to
// determine that the query didn't return the right stuff.
function findByIdAlt(id) {
    return db('users')
        .where({ id })
        .first();
}

//----------------------------------------------------------------------------//
// findPosts()
//
// method to return posts for a single user
//----------------------------------------------------------------------------//
// Good example of using joins in knex. Take some time to look at the variety of
// parameter syntax options you have for the .join() method on the knexjs.org
// website.
function findPosts(id) {
    return db('posts as p')
        .join('users as u', 'u.id', 'p.user_id')
        .select('p.id', 'u.username', 'p.contents')
        .where({ user_id: id });
}



function add(userData) {
    return db('users').insert(userData);
}

//----------------------------------------------------------------------------//
// Since knex is a Promise-based API, we should return the Promise objects that
// knex returns to us. If we wanted to use async/await here, we should create a
// Promise and return it, and in the promise callback, we would call "await" on
// the knex method. We would do this if we felt like we needed to modify the
// knex return value before passing it along.
// 
// Below is an example of the add() method that uses async/await to call
// knex.insert(), and modifies the result before returning it to the caller. 
// 
// The caller is expecting a Promise (because knex is a promise-based API, in
// order to allow for asynchronous interaction with the database).
//----------------------------------------------------------------------------//
// async function addAlt(userData) {
//     return new Promise((resolve, reject) => {

//         const result = await db('users').insert(userData);
//         if (result) {
//             resolve({ mySpecialAddedField: "added value...", ...result });
//         } else {
//             reject(null);
//         }

//     });
// }

function update(changes, id) {
    return db('users').where({ id }).update(changes);
}


function remove(id) {
    return db('users').where({ id }).del();
}

module.exports = {
    find,
    findById,
    findByIdAlt,
    findPosts,
    add,
   // addAlt,
    //addAsync,
    update,
    remove
}; 