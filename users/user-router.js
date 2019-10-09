const express = require("express");

const db = require("../data/db-config.js");
const userModel = require('./user-model.js')

const{isValidUser} = require('./user-helpers.js')
const router = express.Router();

router.get("/", (req, res) => {
  userModel.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {

  userModel.findById(req.params.id)
    .then(user => {
      
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  if (isValidUser(req.body)) {
    userModel.add(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
  } else {
    res.status(500).json({ message: "Failed to create new user" });
  }
  
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
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  
  userModel.remove(req.params.id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

router.get("/:id/posts", (req, res) => {
  
  userModel
    .findPostsById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "error retrieving posts for the user", error });
    });
});

module.exports = router;
