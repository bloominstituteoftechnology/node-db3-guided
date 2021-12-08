const express = require('express')
const User = require('./user-model')
const { checkUserData, checkUserId } = require('./user-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/:id', checkUserId, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.get('/:id/posts', checkUserId, (req, res, next) => {
  User.findPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
})

router.post('/', checkUserData, (req, res, next) => {
  User.add(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
})

router.delete('/:id', checkUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(count => {
      res.json({ removed: count })
    })
    .catch(next)
})

module.exports = router
