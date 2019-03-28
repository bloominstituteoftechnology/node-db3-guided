exports.seed = function(knex, Promise) {
  return knex('cohorts').insert([
    { name: 'web-1', track_id: 1 }, // 1
    { name: 'web-2', track_id: 1 }, // 2
    { name: 'web-3', track_id: 1 }, // 3
    { name: 'ds-1', track_id: 2 }, // 4
    { name: 'ds-2', track_id: 2 }, // 5
    { name: 'ds-3', track_id: 2 }, // 6
    { name: 'android-1', track_id: 3 }, // 7
    { name: 'android-2', track_id: 3 }, // 8
    { name: 'android-3', track_id: 3 }, // 9
    { name: 'ios-1', track_id: 4 }, // 10
    { name: 'ios-2', track_id: 4 }, // 11
    { name: 'ios-3', track_id: 4 }, // 12
  ]);
};
