INSERT INTO department (id, name)
VALUES (1, 'Redundancy & Repetition'),
(2, 'Spam Tasting'),
(3, 'Argument Initiation'),
(4, 'Viking Reenactments'),
(5, 'Cat Folding');

INSERT INTO role (title, salary, department_id)
VALUES ('Sword-Wielder', 80000.00, 4),
    ('Archduke of the Zamboni', 37000.00, 1),
    ('Tickle Resister', 60000.00, 5),
    ('Nurf Herder', 25000.17, 3),
    ('Dude Abiding', 25000.18, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Saul', 'Goodman', 4, 8),
('Ernie', 'Pantuso', 5, 8),
('Kevin', 'Arnold', 3, 8),
('Bull', 'Shannon', 1, NULL),
('Charlie', 'Bucket', 2, 8),
('Dorothy', 'Everton-Smythe', 4, 8),
('Sophia', 'Petrillo', 2, 8),
('Bob', 'Kazamakis', 2, 4);