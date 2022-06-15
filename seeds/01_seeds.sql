-- users
INSERT INTO users VALUES 
(1, 'Jaeden', 'jaeden.t.west@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Ryan', 'ryanball@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Spoons', 'spoonsthecat@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


--properties
INSERT INTO properties VALUES 
(1, 1, 'cottage', '4 level split','url', 'url', 200, 2, 2, 4, 'Canada', 'Calgary','Alberta', 'T2X1W4', true),
(2, 2, 'apartment', 'two masters shared common area','url', 'url', 100, 2, 2, 2, 'USA', 'Albuquerque', 'New Mexcio', '87114', true),
(3, 3, 'cat tower', 'tall and box-like, built-in toys','url', 'url', 25, 1, 1, 1, 'USA', 'Albuquerque', 'New Mexico', '87114', false);

--reservations
INSERT INTO reservations VALUES 
(1, '2022-09-01', '2023-01-01', 2, 1),
(2, '2022-08-24', '2022-09-01', 1, 2),
(3, '2022-03-05', '2022-06-05', 3, 3);


--property reviews
INSERT INTO property_reviews VALUES 
(1, 1, 2, 1, 5, 'Love the high ceilings'),
(2, 2, 1, 2, 3, 'Loud upstairs neighbours'),
(3, 3, 3, 3, 4, 'Too many humans reaching in');

