module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.db3', // the folder will be created when we run the migrations
    },
    pool: {
      // runs after a connection is made to the sqlite engine
      afterCreate: (conn, done) => {
        // by default SQLite will not enforce Foreign Keys
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
    migrations: {
      // we can change the location of the migrations
      directory: './data/migrations',
    },
    seeds: {
      // we can change the location of the seeds
      directory: './data/seeds',
    },
  },
};
