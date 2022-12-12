const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);



const viewDept = 'SELECT * FROM department';
// const viewEmployees = 'SELECT * FROM employee';
const viewEmployees = `SELECT 
e.id AS emp_id, 
concat(e.first_name, ' ', e.last_name) AS Employee,
role.title, 
concat(m.first_name, ' ', m.last_name) AS Manager,
department.name AS Department,
role.salary AS Salary
FROM employee AS e
JOIN role
ON e.role_id = role.id  
JOIN department
ON role.department_id = department.id
LEFT JOIN employee AS m
ON e.manager_id = m.id
ORDER BY m.id`;
const viewRoles = 'SELECT * FROM role';
const addDept = `INSERT Into department`;

module.exports = {viewDept, viewEmployees, viewRoles, addDept};