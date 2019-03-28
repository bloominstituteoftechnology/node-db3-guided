exports.seed = function(knex, Promise) {
  return knex('cohort_students').insert([
    { cohort_id: 1, student_id: 1 }, // 1
    { cohort_id: 1, student_id: 2 }, // 2
    { cohort_id: 2, student_id: 2 }, // 3
    { cohort_id: 2, student_id: 3 }, // 4
    { cohort_id: 2, student_id: 4 }, // 5
    { cohort_id: 3, student_id: 1 }, // 6
    { cohort_id: 3, student_id: 2 }, // 7
    { cohort_id: 4, student_id: 1 }, // 8
    { cohort_id: 4, student_id: 4 }, // 9
  ]);
};
