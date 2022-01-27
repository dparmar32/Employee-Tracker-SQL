USE employeeTrackerDB;
/* seed department values */
INSERT INTO department
            (name)
VALUES      ('Human Resources'),
            ('Purchasing'),
            ('Operations'),
            ('Sales'),
            ('Management'),
            ('Finance'),
            ('Accounting'),
            ('IT'),
            ('Research and Development'),
            ('Customer Service');

/*seed role values*/
INSERT INTO role
            (title, salary, department_id)
VALUES      ('Human Resources', '5614941.59', 1),
            ('Purchasing', '9295036.66', 1),
            ('Training', '851742.13', 2),
            ('Sales', '1258103.86', 3),
            ('Accounting', '8271051.67', 4),
            ('Engineering', '3799407.60', 4),
            ('Product Management', '3650692.62', 5),
            ('Legal', '1617466.96', 6),
            ('Services', '3597294.32', 8),
            ('Research and Development', '9036923.65', 7),
            ('Support', '3889913.33', 8);

INSERT INTO employee
            (first_name, last_name, role_id, manager_id)
VALUES
       ('Karlie', 'Posse', 12, 9),
            ('Everett', 'Morillas', 22, 8),
            ('Malory', 'Byres', 13, 7),
            ('Marigold', 'Zealy', 21, 12),
            ('Claudell', 'Grzelczak', 18, 8),
            ('Clarance', 'Story', 13, 4),
            ('Susana', 'Simkins', 17, 3),
            ('Rheta', 'Spours', 12, 6),
            ('Jewel', 'Varndell', 21, null),
            ('Brendan', 'Ramberg', 16, 4),
            ('Riannon', 'Ledley', 13, null);





