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
employee.id AS emp_id, 
employee.first_name AS First, 
employee.last_name AS Last, 
employee.manager_id AS Mgr_Id, 
role.title, 
department.name 
FROM employee 
JOIN role
ON employee.role_id = role.id  
JOIN department
ON employee.department_id = department.id;`
const viewRoles = 'SELECT * FROM role';
const addDept = `INSERT Into department`;




module.exports = {viewDept, viewEmployees, viewRoles, addDept};