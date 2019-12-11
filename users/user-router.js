const express = require("express");

const db = require("../data/db-config.js");
const Users = require("./user-model.js");

const router = express.Router();

router.get("/", (req, res) => {
    Users.allUsers()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get users" });
        });
});

router.get("/:id/posts", (req, res) => {
    Users.findUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get user posts" });
        });
});
router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
        .then(users => {
            const user = users[0];

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: "Could not find user with given id."
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get user" });
        });
});

router.post("/", (req, res) => {
    const userData = req.body;

    Users.add(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log("Error inserting user:", err);
            res.status(500).json({ message: "Failed to create new user" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db("users")
        .where({ id })
        .update(changes)
        .then(count => {
            if (count) {
                res.json({ update: count });
            } else {
                res.status(404).json({
                    message: "Could not find user with given id"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update user" });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db("users")
        .where({ id })
        .del()
        .then(count => {
            if (count) {
                res.json({ removed: count });
            } else {
                res.status(404).json({
                    message: "Could not find user with given id"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to delete user" });
        });
});

module.exports = router;
