
  INSERT INTO department (name)
  VALUES ('R&D'),
  ('Sales'),
  ('Support');

   INSERT INTO role (title, salary, department_id)
  VALUES ('Engineer', 100000, 1),
  ('Manager', 200000, 2),
  ('Intern', 0, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 3),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 3),
  ('Edward', 'Bellamy', 3, 3),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 2, 1);

 
