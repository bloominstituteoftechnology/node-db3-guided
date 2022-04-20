const db = require('../../data/db-config')

module.exports = {
  async checkUserId(req, res, next) {
    const user = await db('users').where('id', req.params.id).first()
    if (user) {
      next()
    } else {
      next({ message: 'Could not find user with given id.', status: 404 })
    }
  },
  checkUserData(req, res, next) {
    if (!req.body.username || !req.body.username.trim()) {
      next({ message: 'Could not find user with given id.', status: 404 })
    } else {
      req.body.username = req.body.username.trim()
      next();
    }
  }
}
