const mysql = require('mysql2');
const init = require('./index.js')
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
const viewEmployees = 'SELECT * FROM employee';
const viewRoles = 'SELECT * FROM role';




module.exports = {viewDept, viewEmployees, viewRoles};