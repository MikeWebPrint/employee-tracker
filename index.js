// Import and require mysql2
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDept, viewEmployees, viewRoles, addDept } = require('./queries.js')
const title = `                                                                                                                                  
                                                                                                                                  
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗         ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝         ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                                                                  
`;

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
function showTitle() {
  console.log(title);
  return main_menu();
}
function main_menu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What do you want to do?',
        name: 'main_menu',
        choices: [
          ' 🦖 View All Departments',
          ' 🦆 View All Roles',
          ' 📍 View All Employees',
          ' 💼 Add a Department',
          ' 📺 Add a Role',
          ' 🧢 Add an Employee',
          ' 🧰 Update an Employee Role'
        ]
      },
    ])
    .then((response) => {
      switch (response.main_menu) {
        case ' 🦖 View All Departments':
          selectQuery(viewDept);
          break;
        case ' 📍 View All Employees':
          selectQuery(viewEmployees);
          break;
        case ' 🦆 View All Roles':
          selectQuery(viewRoles);
          break;
        case ' 💼 Add a Department':
          addDeptQuest();
          break;
        case ' 📺 Add a Role':
          getCurrentDepts();
          // addRoleQuest(currentDepts);
          break;  
        case ' 🧢 Add an Employee':
          addEmployeeQuest();
          break;
        case ' 🧰 Update an Employee Role':
          console.log('Update an Employee Role')
          break;          
      }
    })
}

function getCurrentDepts(){
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    const currentDepts = [];
    results.forEach(element => currentDepts.push(element.name))
    // console.log(currentDepts);
    addRoleQuest(currentDepts);
    // return main_menu();
  })
}
function addDeptQuest(){
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Input department name',
      name: 'newDeptName'
    }
  ])
  .then((response) => {
    addDeptQuery(response.newDeptName);
  }
  )
}

function addDeptQuery(name){
  db.query(`INSERT INTO department (name) VALUES("${name}");`, function (err, results) {
    if (err) {
      console.log('Something went wrong. Please check your input and try again');
    }
    console.log(`${name} added to department table`);
    return main_menu();
  })
}
function addEmployeeQuest(){
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter new employee first name',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'Enter new employee last name',
      name: 'last_name'
    },
    {
      type: 'number',
      message: 'Enter new employee role ID',
      name: 'role_id'
    },
    {
      type: 'number',
      message: 'Enter new employee manager ID',
      name: 'manager_id'
    },
  ])
  .then((response) => {
    addEmployeeQuery(response.first_name, response.last_name, response.role_id, response.manager_id);
  }

  )
}
function addEmployeeQuery(first_name, last_name, role_id, manager_id){
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${first_name}","${last_name}","${role_id}","${manager_id}");`, function (err, results) {
    if (err) {
      console.log('Something went wrong. Please check your input and try again');
    }
    console.log(`${first_name, last_name} added to employee table`);
    return main_menu();
  })
}
function addRoleQuest(currentDepts){
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter a new role title',
      name: 'newRoleTitle'
    },
    {
      type: 'number',
      message: 'Enter role salary',
      name: 'newRoleSalary'
    },
    {
      type: 'list',
      message: 'Select department for this role',
      name: 'newRoleDept',
      choices: currentDepts
    },
  ])
  .then((response) => {
    addRoleQuery(response.newRoleTitle, response.newRoleSalary, response.newRoleDept);
  }
  )
}
function addRoleQuery(title, salary, department_name){
  db.query(`INSERT INTO role (title, salary, department_name) VALUES("${title}","${salary}","${department_name}");`, function (err, results) {
    if (err) {
      console.log('Something went wrong. Please check your input and try again');
    }
    console.log(`${title} added to role table`);
    return main_menu();
  })
}
function selectQuery(query){
  db.query(query, function (err, results) {
    console.table(results);
    return main_menu();
  })
}


function updateQuery(table, id){
  db.query(`UPDATE ${table} SET WHERE id = ?`, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}




showTitle();



