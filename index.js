// Import and require mysql2
const inquirer = require('inquirer');
const mysql = require('mysql2');
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
function showTitle(){
  console.log(title);
  return init();
}
function init() { 
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What do you want to do?',
      name: 'main_menu',
      choices: [
        'View All Departments', 
        'View All Roles', 
        'View All Employees', 
        'Add a Department', 
        'Add a Role', 
        'Add an Employee', 
        'Update an Employee Role'
      ]
    },
  ])
  .then((response) => {
    switch (response.main_menu) {
      case 'View All Departments':
        {db.query('SELECT * FROM department', function (err, results){
          console.table(results);
          return init();
        })}
        break;
      case 'View All Employees':
        db.query('SELECT * FROM employee', function (err, results){
          console.table(results);
          return init();
        })
        break;
      case 'View All Roles':
        db.query('SELECT * FROM role', function (err, results){
          console.table(results);
          return init();
        })
        break;

    }

  });
}


showTitle();




