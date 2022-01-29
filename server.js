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
        password: "",//TODO: please take the password out while commiting
        database: "employeeTrackerDB",
    },
    console.log(`Connected to the employeeTrackerDB.`)
);

/* Establishing connections */
connection.connect(err => {
    // if (err) {
    //     console.err('error connecting: ' + err.stack);
    //     return;
    // }
    if (err) throw err;
    console.log('connected as mysql ');
    empTrack();
});

function empTrack() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "What would you like to do? Choose the option from below",
                choices: [
                    "View all department",
                    "View all role",
                    "View all employee",
                    "Add a new department",
                    "Add a new role",
                    "Add a new employee",
                    "Exit"
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
                case "Add role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                default:
                    exit();
                // case "Update Employee Role":
                //     updateEmployeeRole();
                //     break;
                // case "No Action taken":
                //     connection.end() //Terminating connections
                //     break;
            }
            ;
        });
};

/**
 * Show all department
 */

function viewAllDepartments() {
    const sqlQuery = "SELECT * from department";
    connection.query(sqlQuery, (err, res) => {
        if (err) throw err;
        console.log(`Show all Department:`);
        console.table(res);
        empTrack();
    });
};


function addDepartment (){
    return inquirer
        .prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What name would you like to have for your new department?",
            },
        ])
        .then(function (answer) {
            connection.query('INSERT INTO department (name) VALUES (?)', [answer.newDepartment], function (err, res) {
                if (err) throw err;
                console.table(res)
                empTrack();
            })
        })
}

function exit() {
    connection.end();
    process.exit();
}


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
