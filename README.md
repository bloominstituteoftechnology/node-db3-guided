# Web DB IV Guided Project Solution

## How to Use this Repository

- clone the [starter code](https://github.com/LambdaSchool/webapi-iii-guided).
- create a solution branch: `git checkout -b solution`.
- add this repository as a remote: `git remote add solution https://github.com/LambdaSchool/webapi-iii-guided-solution`
- pull from this repository's `master` branch into the `solution` branch in your local folder `git pull solution master:solution --force`.

A this point you should have a `master` branch pointing to the student's repository and a `solution` branch with the latest changes added to the solution repository.

When making changes to the `solution` branch, commit the changes and type `git push solution solution:master` to push them to this repository.

When making changes to the `master` branch, commit the changes and use `git push origin master` to push them to the student's repository.

## Introduce the Afternoon Challenge

Walk students through the project and stress that it is written in the language of the customer. It is good to practice reading and making sense of client requirements.

Call attention to text in **bold** as it hints to possible system entities that may map to database tables.

## Introduce Data Modeling

We'll take a practical approach to data modeling with emphasis on the process.

There are different types, but we'll cover the **relational** data models.

We'll practice how to translate from customer requirements into a flexible and accurate data model.

Data modeling is a game of `abstraction`.

A good data model is the core of any useful system.

A good data model:

- captures all the information the system needs
- captures only the information the system needs.
- reflects reality.
- is flexible, can evolve with the system.
- guarantees data integrity without sacrificing performance and convenience.
- is driven by the way the system uses the data.

### Components of a Data Model

- Entities: the nouns, the resources in the REST model map nicely to the Entities in the data model. These could map to tables in the database.
- Properties: information we care about for each entity. A mechanic and a car salesman care about different car properties.
- Relationships: how are the entities related to each other.

### Workflow

Point out that some of the best tools for data modeling is pencil and paper or a white board and markers.

- identify the entities.
- identify the properties for each entity.
- identify the relationships between entities.

## Model Tracks, Cohorts and Students

Walk students through modeling tracks, cohorts and students in the context of Lambda School.

- use google sheet to diagram the three entities, similar to [the Step 1 section on this sheet](https://docs.google.com/spreadsheets/d/1K5hBGAG5u5YvEilP1uNcz5n6edSYjXi5ykiSbKqT_7I/edit?usp=sharing)
- put the model to the test by trying to write a query to get a list of all students, including the name of the cohort they belong to.

```sql
select s.name as student, c.name as cohort
from students as s
inner join cohorts as c on s.cohortId = c.id
-- there is no cohortId in the students table
-- we need a way to express that a student belongs to a cohort
-- this is done by identifying and modeling the relationships between both entities
```

## Introduce Relationships

- explain one to one relationships and provide examples.
- explain one to many relationships. Note this is the most common relationship.
- explain many to many relationships.

Copy the content of `Step 1` and modify it to look like `Step 2` in the google sheet.

- explain the thinking behind that one to many relationship.
- introduce the concept of a `Foreign Key` and how it works in this example.
- note that the data type of the `Foreign Key` must be the same as the data type of the `Primary Key` in the table it references.

Ask: does the `foreign key` go on the `one` side or on the `many` side of the relationship?

Ask students to model the relationship between `tracks` and `cohorts`. Where should we place the foreign key and what could be a good name for it? (Step 3)

New Requirement: write a query to list all students including the name of the track they belong to.

```sql
-- our model is flexible enough to fulfill the requirement
select s.name as student, t.name as track
from students as s
inner join cohorts as c on s.cohortId = c.id
inner join tracks as t on t.id = c.trackId
```

**time for a break? Take 5 minutes**

## Add support for Multiple Cohorts per Student

The current model does not provide a way to express a student attending more than one cohort.

Explain that all is needed for a many to many relationship is a third table (Step 4).

Review the process we followed to arrive at this model.

There is one more thing we can check to see if our model is correct, that is checking that it is **normalized**, we'll talk about `normalization` in the next section.

## Normalization

Open Training Kit and introduce normalization as a **process** of removing redundancies and anomalies from a data model.

Do not take too much time, do a quick and brief run down of the normal forms. A model on the third normal form (3NF) is normally considered normalized.

Our model is in 3NF.

## Build a Migration for The Model

Make and run a migration called `bootstrap` that will generate the database.

Explain the code as you type it and after you're done, drop it on slack as a snippet for the students to copy. This saves time.

```js
// ./data/migrations/timestamp_bootstrap.js
exports.up = function(knex, Promise) {
  // the tables most be created in the right order,
  // tables with FK are created after the referenced table is created
  return knex.schema
    .createTable('tracks', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique();
    }) // it is possible to chain multiple createTable calls
    .createTable('cohorts', tbl => {
      // the tracks table must be created before this table is created
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique();

      tbl
        .integer('track_id')
        .unsigned()
        .references('id')
        .inTable('tracks')
        .onDelete('CASCADE') // explain how cascading works
        .onUpdate('CASCADE');
    })
    .createTable('students', tbl => {
      tbl.increments();

      tbl.string('name', 128).notNullable();
    })
    .createTable('cohort_students', tbl => {
      // the students and cohorts tables must be created before this table is created
      tbl.increments();

      tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      tbl
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  // tables with FK must be removed before the referenced table is removed
  return knex.schema
    .dropTableIfExists('cohort_students')
    .dropTableIfExists('students')
    .dropTableIfExists('cohorts')
    .dropTableIfExists('tracks');
};
```

Make and run seeds for cleanup and all the tables. Have the code available to copy and paste into the files to save time. Drop it on Slack for the students.

```js
// ./seeds/000-cleanup.js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex);
};

// ./seeds/001-tracks.js
exports.seed = function(knex, Promise) {
  return knex('tracks').insert([
    { name: 'Full Stack Web' }, // 1
    { name: 'Data Science' }, // 2
    { name: 'Android' }, // 3
    { name: 'iOS' }, // 4
  ]);
};

// ./seeds/002-cohorts.js
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

// ./seeds/003-students.js
exports.seed = function(knex, Promise) {
  return knex('students').insert([
    { name: 'student 1' }, // 1
    { name: 'student 2' }, // 2
    { name: 'student 3' }, // 3
    { name: 'student 4' }, // 4
  ]);
};

// ./seeds/004-cohort_students.js
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
```

**wait for students to catch up**

## Extract Knex Configuration

- add a file to the `data` folder called `dbConfig.js`.

```js
const knex = require('knex');

const knexConfig = require('../knexfile.js');

// pick the development configuration
module.exports = knex(knexConfig.development);
```

Any file that needs to get access to the database simple needs to require this file.

**wait for students to catch up**

## Add a Data Layer for Tracks

Let's see an example of using the Knex configuration file.

- add a folder called `tracks`.
- add a file named `tracks-model.js` to the `tracks` folder.

```js
// db is a configured instance of knex that knows how to talk to the database
const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('tracks');
}

function findById(id) {
  return db('tracks')
    .where({ id })
    .first();
}

function add(track) {
  // passing 'id' as the second parameter is recommended to ensure the id is returned
  // when connecting to other database management systems like Postgres
  return db('tracks').insert(track, 'id');
}

function update(id, changes) {
  return db('tracks')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('tracks')
    .where({ id })
    .del();
}
```

**wait for students to catch up**
