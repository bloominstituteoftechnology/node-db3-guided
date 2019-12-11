const db = require("../data/db-config.js");

module.exports = {
  allUsers,
  findById,
  add,
  findUserPosts
};

function findUserPosts(userId) {
    return db('posts as p')
    .select("p.id", "p.contents as Qoute", "u.username as Author")
    .join("users as u", "p.user_id", "u.id")
    .where("user_id", userId)
}

function allUsers() {
  return db("users");
}

function findById() {
  return db("users")
  .where({ id })
  .first();
}

function add() {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
