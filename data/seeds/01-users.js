exports.seed = function (knex) {
  return knex('users').insert([
    { username: 'lao_tzu' },
    { username: 'socrates' },
    { username: 'seneca' },
    { username: 'hypatia' },
  ])
}
