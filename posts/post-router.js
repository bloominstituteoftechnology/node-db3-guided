const express = require('express');
const Post = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Post.all()
    .then(posts => {
      res.status(200).json({ data: posts });
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get posts' });
    });
});



module.exports = router;