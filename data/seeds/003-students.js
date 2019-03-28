exports.seed = function(knex, Promise) {
  return knex('students').insert([
    { name: 'student 1' }, // 1
    { name: 'student 2' }, // 2
    { name: 'student 3' }, // 3
    { name: 'student 4' }, // 4
  ]);
};
