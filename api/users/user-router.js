const express = require('express')

const Users = require('./user-model.js')

const router = express.Router()

router.get('/', (req, res, next) => {
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        next({ message: 'Could not find user with given id.', status: 404 })
      }
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id/posts', (req, res, next) => {
  const { id } = req.params

  Users.findPosts(id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', (req, res, next) => {
  const userData = req.body

  Users.add(userData)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  Users.update(changes, id)
    .then(user => {
      if (user) {
        res.json({ user })
      } else {
        next({ message: 'Could not find user with given id.', status: 404 })
      }
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Users.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count })
      } else {
        next({ message: 'Could not find user with given id.', status: 404 })
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
