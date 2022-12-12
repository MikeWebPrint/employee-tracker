const viewDept = `SELECT 
name AS Department,
id AS dept_id 
FROM department`;
// const viewEmployees = 'SELECT * FROM employee';
const viewEmployees = `SELECT 
e.id AS emp_id, 
concat(e.first_name, ' ', e.last_name) AS Employee,
role.title AS Job_Title, 
concat(m.first_name, ' ', m.last_name) AS Manager,
department.name AS Department,
role.salary AS Salary
FROM employee AS e
JOIN role
ON e.role_id = role.id  
JOIN department
ON role.department_name = department.name
LEFT JOIN employee AS m
ON e.manager_id = m.id
ORDER BY m.id`;

const viewRoles = `SELECT 
id AS job_id,
title AS job_title,
salary,
department_name AS dept 
FROM role`;
const addDept = `INSERT Into department`;

module.exports = {viewDept, viewEmployees, viewRoles, addDept};