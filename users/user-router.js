const express = require("express");

const db = require("../data/db-config.js");
const users = require('./user-model.js')

const router = express.Router();

router.get("/", (req, res) => {
  users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  users.findById(id)
    .then(user => {
      // const user = users[0]; // no longer an array, returns object.
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

router.get("/:id/posts", (req,res) => {
  const {id} = req.params;

  users.findPosts(id)
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({message: 'failed to get posts'});
  })
})

router.post("/", (req, res) => {
  const userData = req.body;

  users.add(userData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

//alternative for post

// router.post("/", (req, res) => {
//   const userData = req.body;
//   users.add(userData)
//     .then(newUser => {
//       res.status(201).json({ newUser });
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to create new user" });
//     });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

    users.update(changes, id)
    .then(user => {
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users.remove(id)
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

module.exports = router;
