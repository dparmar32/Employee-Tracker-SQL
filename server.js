/*Node Packages*/
// const express = require("express");

const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// const PORT = process.env.PORT || 3001;
// const app = express();
//
// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

/*Reference connection: https://www.npmjs.com/package/mysql */
// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "", //TODO: please enter your password
    database: "employeeTrackerDB",
  },
  console.log("Connected to the employeeTrackerDB.")
);

/* Establishing connections */
connection.connect((err) => {
  // if (err) {
  //     console.err('error connecting: ' + err.stack);
  //     return;
  // }
  if (err) throw err;
  console.log("--------------------------------------");
  console.log("     MySQL connection established     ");
  console.log("--------------------------------------");
  empTrack();
});

/**
 * The empTrack function is used to display the options to the user
 */
function empTrack() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do? Choose the option from below",
        choices: [
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "View all department",
          "View all role",
          "View all employee",
          "Update employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      console.log("Would you like to : " + answer.choices);
      switch (answer.choices) {
        case "View all department":
          viewAllDepartments();
          break;
        case "View all role":
          viewRoles();
          break;
        case "View all employee":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        default:
          exit();
      }
    });
}

/**
 * This function will execute a SQL query to show all the departments in the database
 */
function viewAllDepartments() {
  const sqlQuery = "SELECT * from department";
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.log("------------------------------");
    console.log("     Show all Department:     ");
    console.log("------------------------------");
    console.table(res);
    empTrack();
  });
}

/**
 * This function will query the database for all the roles and display them in a table
 */
function viewRoles() {
  const sqlQuery = "SELECT * FROM role";
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.log("-------------------------");
    console.log("     Show all Roles:     ");
    console.log("-------------------------");
    console.table(res);
    empTrack();
  });
}

/**
 * This function will execute a SQL query that will select all the employees from the employee table
 */
function viewEmployees() {
  const sqlQuery = "SELECT * FROM employee";
  connection.query(sqlQuery, (err, res) => {
    if (err) throw err;
    console.log("-----------------------------");
    console.log("     Show all employees:     ");
    console.log("-----------------------------");

    console.table(res);
    empTrack();
  });
}

/**
 * This function prompts the user for a new department name, and then inserts that department name into
 * the database
 * @returns A promise that returns the answer to the question.
 */
function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What name would you like to have for your new department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.newDepartment,
        function (err, res) {
          if (err) throw err;
          console.log("------------------------");
          console.log("     Add Department     ");
          console.log("------------------------");
          console.table(res);
          empTrack();
        }
      );
    });
}

/**
 * This function prompts the user for the role name, salary, and department ID number. 
 * It then uses the connection.query method to insert the role into the role table. 
 * It then displays the results of the query to the user
 */
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What salary does the role have?",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "What is the department id number for the role?",
        name: "deptID",
      },
    ])
    .then(function (answer) {
      connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.roleName, answer.roleSalary, answer.deptID],
          function (err, res) {
              if (err) {
                  throw err;
              }
              console.log("------------------");
              console.log("     Add Role     ");
              console.log("------------------");
              console.table(res);
              empTrack();
          }
      );
    });
}

/**
 * The addEmployee function prompts the user for the first name, last name, role id, and manager id of
 * the employee. 
 * It then inserts the employee into the employee table
 */
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee?",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee?",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What is the role id number of the employee?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.employeeFirstName,
          answer.employeeLastName,
          answer.roleID,
          answer.managerID,
        ],

        function (err, res) {
          if (err) {throw err;}
          console.log("----------------------");
          console.log("     Add Employee     ");
          console.log("----------------------");
          console.table(res);
          empTrack();
        }
      );
    });
}

/**
 * This function prompts the user for an employee name and role id to update
 */
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update the role of?",
        name: "employeeRoleUpdate",
      },

      {
        type: "input",
        message: "What role id would you like to update?",
        name: "updateRole",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        answer.updateRole,
        answer.employeeRoleUpdate,
        function (err, res) {
          if (err) throw err;
          console.log("------------------------------");
          console.log("     Update Employee Role     ");
          console.log("------------------------------");
          console.table(res);
          empTrack();
        }
      );
    });
}

/**
 * This function is used to end the connection to the database and exit the program.
 */
function exit() {
  console.log("-----------------------------------------------");
  console.log("Thank you for using the Employee Tracker system");
  console.log("-----------------------------------------------");
  connection.end();
  process.exit();
}

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
