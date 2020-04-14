-- simple join. also known as an "inner join" (no need to specify "inner", but
-- you can if you want...)
--
-- Joining 2 tables results in a "temporary" table that contains the combined
-- data. The "on" clause specifies a condition that must be met for each
-- combined record before it is added to the temp table.
--
-- With an "inner" join, a combined record is not created unless a
-- table-a+table-b combination satisfies the condition. The condition is usually
-- a comparison or calculation using fields from the combined record.
--
-- The system will combine each record in table a with each record in table b,
-- and run the condition/comparison on the record. If it passes, it's in.
--------------------------------------------------------------------------------

select ProductName, CompanyName 
from Product
join Supplier
on SupplierId = Supplier.id;
-- SupplierId is from Product table and Supplier.id is the is from Supplier table
--------------------------------------------------------------------------------
-- You can use "order by" and "where" on the joined table.
--------------------------------------------------------------------------------
select firstname,lastname, [order].*
from employee
join [order]
on employee.id = employeeid
order by firstname;
--------------------------------------------------------------------------------
-- You can also "alias" tables using the "as" keyword. This allows you to
-- shorten table names in lengthy and complex SQL statements, ostensibly making
-- them easier to read.
--
-- If it fails to make it easire, don't use aliases. :)
--------------------------------------------------------------------------------
select e.FirstName, e.LastName, o.OrderDate, o.ShipCountry
from [order] as o
join employee as e
on o.EmployeeId = e.Id
where e.lastname like 'B%'--starts with b
order by o.OrderDate;
--order by o.ShipCountry;

--------------------------------------------------------------------------------
-- There are many kinds of joins. "INNER" and "LEFT" joins are the two you will
-- use most of the time (if not all of the time.) Some database don't support
-- any other kind of join.
--
-- "LEFT" joins are often referred to as "LEFT OUTER" joins.
--
-- "INNER" refers to a venn diagram, where 2 tables overlap. If there are
-- records in table A that don't satisfy the condition after being combined with
-- EVERY record in table B, then that record from table A is not included in the
-- joined table. Likewise, if there are records in table B that can't be used to
-- form a combined record that matches the criteria, then that record from table
-- B is not included in the joined table at all. "INNER" refers to the
-- overlapping part of a venn diagram - the inner part - only records from each
-- table that can combine with one or more records from the other table to
-- satisfy the criteria, are included.
--
-- OUTER joins will include data from one table even if it doesn't combine with
-- anything in the other table to satisfy the criteria.
select * from customer as c left join [order] as o
on c.id = o.customerid
order by c.id;
-- same but opposite order
select * from [order] as o left join [customer] as c
on c.id = o.customerid
order by c.id;
--------------------------------------------------------------------------------
-- In this example, I deleted orders from the Order table, and showed how a left
-- join. All orders for customer 'ANATR' are deleted, yet the ANATR customer
-- will appear in the joined results, becaue we are "left joining" the customer
-- table - all records in the customer table are included in the joined result,
-- even if they don't combine with anything from the [order] table to meet the
-- criteria (c.id = o.customerid). All of the fields from the [order] table that
-- are supposed to be in the joined result will be "null" for the one record for
-- the ANATR customer that is added to the joined results. This is because there
-- is no longer any data in the [order] table to match it (because we deleted
-- all orders for ANATR - just to demonstrate this point.)
--------------------------------------------------------------------------------
delete from [order] where customerid = 'ANATR';

select c.*, o.*
from customer as c
left join [order] as o
on c.id = o.customerid

--------------------------------------------------------------------------------
-- AGGREGATE FUNCTIONS
--------------------------------------------------------------------------------
-- SQL supports a number of "aggregate functions". These all can work with or
-- with the GROUP BY command.
--
-- GROUP BY takes a field name, and forms one or more "groups" based on the
-- value of that field/column name. All records with the same value for that
-- field are "grouped" together.
--
-- Aggregate functions such as count(), min(), max(), avg(), and sum() will
-- execute for each "group" (if GROUP BY is not used, then there is 1 "group" -
-- the main result set). A single record is returned in the joined table for
-- each group. The "select" statement may identify fields from the result set to
-- include, but it will also create a temporary column for the aggregate
-- function.
--
-- In the example below, "count" is used to count the number of records that
-- have a value in the ProductName field, for each group. The GROUP BY command
-- causes multiple groups to be formed, based on the criteria. Then, the count
-- operation / aggregation is executed on each group of records.
--------------------------------------------------------------------------------
select c.categoryname as category, count(p.productname)as [number of products]
from product as p
join category as c 
on p.categoryid = c.id
group by c.categoryname
order by category;
--------------------------------------------------------------------------------
-- The same technique is used to find the lowest priced product in each group.
-- 
-- Note the alias for the temporary column for "min()".
--
-- The GROUP BY command identifies how records will be grouped.
-- we can us min(), max(), sum(), ave() too
select c.categoryname as category, min(p.unitprice)as [cheapest product costs]
from product as p
join category as c
on p.categoryid = c.id
group by c.categoryname
order by c.categoryname;
-- order by category;--same
--------------------------------------------------------------------------------
-- This is the same concept, but with "max()".
SELECT c.categoryname AS category,
       max(p.unitprice) 
  FROM product AS p
       JOIN
       category AS c ON p.categoryid = c.id
 GROUP BY category
 ORDER BY category;

--RETURNS a table with the emoplyee first and last names and the total number of orders each made
select firstname,lastname, count(employee.id) as[number of orders]
from employee
join [order]
on employee.id = employeeid
group by firstname
order by firstname;