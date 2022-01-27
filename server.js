/*Node Packages*/
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '', //TODO: Remove it while pushing
        database: 'employeeTrackerDB'
    },
    console.log(`Connected to the employeeTrackerDB database.`)
);

db.connect((err) => {
    if (err) throw err;
    empTrack();
});



function viewDepartment() {
    let sqlQuery = 'SELECT * FROM department';
    db.query(sqlQuery,(err, res) => {
        if (err) throw (err);
        console.log('DEPARTMENTS:');
        console.table(res);
        empTrack()
    })
}

function viewRole() {
    let sqlQuery = 'SELECT * FROM role ';
    db.query(sqlQuery,(err, res) => {
        if (err) throw (err);
        console.log('ROLES:');
        console.table(res);
        empTrack()
    })
}

function viewEmployee() {
    let sqlQuery = 'SELECT * FROM employee ';
    db.query(sqlQuery,(err, res) => {
        if (err) throw (err);
        console.log('EMPLOYEE:');
        console.table(res);
        empTrack()
    })
}

const empTrack = () => {
    inquirer
        .prompt([
            {
                name: 'choices',
                type: 'list',
                message: 'What would you like to do? Choose the option from below',
                choices: [
                    'Add a new department',
                    'Add a new role',
                    'Add a new employee',
                    'Update employee role',
                    'View all department',
                    'view all employee',
                    'veiw all employee role',
                    'View all employee by department',
                    'Remove department',
                    'Remove employee',
                    'Remove role',
                    'I am done'
                ]
            }
        ])
        .then((answer) => {
                switch (answer.action) {
                    case 'view all department':
                        viewDepartment();
                        break;
                    case 'View all role':
                        viewRole();
                        break;
                    case 'View all employee':
                        viewEmployee();
                        break;
                }
            }
        )
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;