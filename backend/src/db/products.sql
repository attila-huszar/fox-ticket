USE foxticket_db;

INSERT INTO products (name, price, duration, description, type) VALUES
("Single-ticket", 350, 1, "You can use this ticket for only one ride", "ticket"),
("30-minute-ticket", 530, 30, "You can use this ticket for 30 minutes", "ticket"),
("90-minute-ticket", 530, 90, "You can use this ticket for 90 minutes", "ticket");

INSERT INTO products (name, price, duration, description, type) VALUES
("Monthly pass", 9500, 30, "You can use this ticket for 30 days", "pass"),
("Monthly pass for businesses", 10500, 30, "You can use this ticket for 30 days", "pass"),
("24h pass", 2500, 1, "You can use this ticket for 1 day", "pass"),
("72h pass", 5500, 3, "You can use this ticket for 3 days", "pass"),
("Weekly pass", 6500, 7, "You can use this ticket for 1 week", "pass");