USE foxticket_db;

SELECT name, price FROM products JOIN orders ON
products.id = orders.productId
WHERE orders.userId = 1 ORDER BY price DESC LIMIT 3;
-- GROUP BY/ORDER BY/LIMIT

SELECT type AS "Ticket type", SUM(price) AS "Price sum" FROM products GROUP BY type;

SELECT DISTINCT type FROM products;

SELECT AVG(price) AS "Avarage price" FROM products WHERE type = "pass";
-- SELECT AVG/COUNT/SUM/MIN/MAX(oszlopnév) AS mint

SELECT COUNT(name) AS "Pass type count" FROM products WHERE duration >= 1 AND duration < 10;

INSERT INTO products (name, price, duration, description, type)
VALUES ("Test3", 500, 60, "Desc1", "ticket"), ("Test4", 7000, 14, "Desc1", "pass");

SELECT name FROM products WHERE description LIKE "%min%" AND duration IN (30, 90);

UPDATE products SET products.name = "Test2" WHERE id = 9;

DELETE FROM products WHERE id = 13;
