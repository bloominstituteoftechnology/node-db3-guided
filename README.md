# Web DB III Guided Project Solution

Guided project solution for **Web DB III** Module.

Starter code is here: [Web DB III Guided Project](https://github.com/LambdaSchool/webdb-iii-guided).

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
- [This Query Tool Loaded in the browser](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top).

## Starter Code

The [Starter Code](https://github.com/LambdaSchool/webdb-iii-guided) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

## Introduce Module Challenge

Introduce the project for the afternoon. If they are done early, encourage them to study tomorrow's content and follow the tutorials on TK.

## Use INNER JOIN to Query Data from Multiple Tables

Load [the w3schools query](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) in a browser window.

Write a query to select all orders: `select * from orders`. Note the `CustomerID`, `EmployeeID`. A manager may not get much value out of this report. It's unlikely that managers know all employees or customers by their Ids.

Load TK and introduce Joins and their use to query combined dat from multiple tables. Mention the different types and stress that `INNER JOIN` and `LEFT JOIN` are the most common. We'll see example of both.

First let's bring information about the `Customers` using the `CustomerID` field from the `Orders` table. Type and explain the following query:

```sql
-- we pick the columns we want from each table using dot notation like we do with objects
select Customers.CustomerName, Customers.Country, Orders.OrderID, Orders.OrderDate
from Orders
inner join Customers on Orders.CustomerID = Customers.CustomerID
-- the order of the condition doesn't matter could be: Customers.CustomerID = Orders.CustomerID
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated 3 minute to complete)

Ask students to include the Employee's `FirstName` and `LastName` as by joining that preceding query to the `Employees` table.

Possible answer:

```sql
-- we pick the columns we want from each table using dot notation like we do with objects
select Customers.CustomerName, Customers.Country, Orders.OrderID, Orders.OrderDate,
  Employees.FirstName, Employees.LastName
from Orders
inner join Customers on Orders.CustomerID = Customers.CustomerID
inner join Employees on Orders.EmployeeID = Employees.EmployeeID
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use LEFT JOIN

Let's way we want to see all customers even if they don't have any orders. That is a good use case for a `LEFT JOIN`.

```sql
-- we pick the columns we want from each table using dot notation like we do with objects
select Customers.CustomerName, Customers.Country, Orders.* -- the * means all columns from orders
from Customers left join Orders on Orders.CustomerID = Customers.CustomerID
-- the left table is the one following FROM in the query

-- add the next 2 lines after running the code above to show left join with more tables
  , Employees.FirstName, Employees.LastName -- note the comma at the beginning of the line
left join Employees on Orders.EmployeeID = Employees.EmployeeID
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use || to Concatenate Strings

Explain that some DBMS have a `concat` function, but SQLite uses `||`.

```sql
-- we pick the columns we want from each table using dot notation like we do with objects
select Customers.CustomerName, Customers.Country, Orders.*, (Employees.FirstName || ' ' || Employees.LastName) as SoldBy
from Customers
left join Orders on Orders.CustomerID = Customers.CustomerID
left join Employees on Orders.EmployeeID = Employees.EmployeeID
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

**Take a break if it's a good time**

## Use Table Name Aliases to Shorten Query

Explain how to use the table name alias.

```sql
-- we pick the columns we want from each table using dot notation like we do with objects
select c.CustomerName, c.Country, o.*, (e.FirstName || ' ' || e.LastName) as SoldBy
from Customers as c
left join Orders as o on o.CustomerID = c.CustomerID
left join Employees as e on o.EmployeeID = e.EmployeeID
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use GROUP BY with Aggregate Functions and LIMIT

Introduce `GROUP BY` and aggregate functions like `SUM`, `AVG` and `COUNT`.

Let's write a query to list the number of items ordered for each order organized by the number of items descending to show the larger orders at the top.

```sql
select o.OrderID, count(*) as ItemsOrderedCount
from Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID

group by o.OrderID -- goes before the order by and after any WHERE, order matters
order by ItemsOrderedCount desc -- goes after the group by

-- to only show the top 5 orders by number of items ordered add the next line
limit 5 -- explain what limit is doing here
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## You Do (estimated 5 minutes to complete)

Ask students to list the top 5 selling products based on the number of items sold. Include the `ProductName` and the number of items sold.

Possible solution:

```sql
select p.ProductName, count(*) as Sold
from Products as p
inner join OrderDetails as od on p.ProductID = od.ProductID
group by ProductName
order by Sold desc
limit 5
```

## Use SUM and OFFSET

Let's see the **revenue by product** to bring several concepts together. Navigate through the tables to find the `quantity` and `price` columns. They are in the `Products` and `OrderDetails` tables.

```sql
select p.ProductName, sum(od.Quantity * p.Price) as Revenue
from Products as p
inner join OrderDetails as od on p.ProductID = od.ProductID
group by ProductName
order by Revenue desc
limit 5
offset 2 -- explain how offset works
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

**Take a break if it's a good time**

Next, we'll move to JavaScript and learn about migrations and seeding.

**Continue working on the guided project built the previous day**.

## Introduce Knex Migrations

Show the [Schema Builder section of the Knex documentation](https://knexjs.org/#Schema) and explain that we can use the methods listed to build and manage database schemas.

Remove the database from `SQLite Studio` to release any possible locking of the file by the OS.

Open the guided project built for the Web DB II module and **delete the database**. We'll re-create it using `Knex Migrations`. Check the folder using your OS file navigator to make sure the DB is gone.

Explain what a migration is.

We will generate the database and the `Roles` table, here's the `schema` for it:

| Column | Type         | Metadata                              |
| ------ | ------------ | ------------------------------------- |
| id     | integer      | Primary Key, Auto-increment, Not Null |
| name   | varchar(128) | Unique, Not Null                      |

Show that typing `npx knex` in the terminal will show a list of possible commands. There are three basic commands `init`, `migrate` and `seed`. We'll see examples of all of them.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use Knex init to Generate knexfile.js

Add a folder that will contain the database and the migrations and seeding scripts, we're calling it `data` for this example.

By default, `Knex Migrations` will look for the information needed to configure `knex` inside a file named `knexfile.js` that should be at the root folder of the application.

To have knex generate that file automatically just type: `npx knex init`.

- Open the file and show the content of it.
- Remove the `staging` and `production` properties, leaving only the `development` key.
- update `knexfile.js` with the following information:

```js
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    // create the data folder manually
    connection: {
      filename: './data/rolex.db3', // the name for the database file to use, adjust as needed
    },
    migrations: {
      directory: './data/migrations', // the migrations folder is added to the root by default, this moves it to /data
    },
    seeds: {
      directory: './data/seeds', // the seeds folder is added to the root by default, this moves it to /data
    },
  },
};
```

Note that this is the same information we used to configure knex, but now it is extracted away to it's own file.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Next, we'll create a migration that will create the database and add the Roles table to it.

## Use Knex Migrations to Create a Table and Database (if it does not exist)

- in the terminal type: `npx knex migrate:make createRolesTable` to generate a migration.
- open the file and note the timestamp added at the beginning of the filename to make sure migrations are run in the same order they were created.
- explain how the `up` (changes to apply to the db schema) and `down` (how to undo the changes from `up`) functions work.

Fill in the `up` and `down` functions:

```js
// changes to be applied to the database
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function(tbl) {
    // primary key called id, integer, auto-increment
    tbl.increments(); // generates primary key automatically

    // show the knex docs to see the different data types included
    tbl
      .string('name', 128) // will generate a varchar(128) by default. SQLite ignores the sizing but other DBMS will respect it.
      .notNullable() // make it required or NOT NULL
      .unique(); // add a unique constraint and index automatically

    tbl.timestamps(true, true); // adds created_at and updated_at columns that default to current date and time
  });
};

// undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles');
};
```

Make sure to explain that we should create a new migration for any future changes the the DB schema (adding columns, renaming columns, adding tables, removing columns, etc)

To apply the migration to the database (if the db does not exist it will create it when using SQLite) type: `npx knex migrate:latest`.

Open the DB using `SQLite Studio` and show that the table has the structure we defined and the extra fields generated by `timestamps()`.

To undo the changes from the latest migrations, use: `npx knex migrate:rollback`. Running `npx knex migrate:latest` will re-apply the latest migrations again.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Add a Foreign Key using Knex Migrations

Add a new migration for a 'users' table: `npx knex migrate:make createUsersTable`.

Add the following content to the generated migration file:

```js
// what changes are to be applied to the database
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // primary key called id, integer, auto-increment
    tbl.increments();

    tbl.string('name', 128).notNullable();

    // Foreign Key example - we'll explain how Foreign Keys work in the Data Modeling lecture
    tbl
      .integer('role_id') // the field to be added to the users table
      .unsigned() // include this because some DBMS need it
      .references('id') // the primary key in the parent table
      .inTable('roles') // the name of the parent table
      .onDelete('CASCADE') // ask students to add it and we'll explain what they do in the Data Modeling lecture
      .onUpdate('CASCADE'); // ask students to add it and we'll explain what they do in the Data Modeling lecture

    tbl.timestamps(true, true);
  });
};

// how can I undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Knex Seeding to add Data to Tables

To create a seed type: `npx knex:seed 01-roles`. Numbering is a good idea because `knex` will not add a timestamp to the name like migrate does. Adding numbers to the file name we can control the order in which they run.

Add the following content to the generated seed file:

```js
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .truncate() // make sure to replace .del() with this, as this resets the ids and delete will not.
    .then(function() {
      // Inserts seed entries
      return knex('roles').insert([
        { name: 'student' },
        { name: 'PM' },
        { name: 'TA' },
      ]);
    });
};
```

Run the seed files by typing: `npx knex seed:run`.

Run the API and test it out from Postman, all endpoints should still work, only now they are working with the new database we created using migrations and seeding.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**
