DROP DATABASE IF EXISTS  employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department
  (
     id   INT NOT NULL auto_increment PRIMARY KEY,
     name VARCHAR(30) NOT NULL
  );

CREATE TABLE role
  (
     id            INT NOT NULL auto_increment PRIMARY KEY ,
     title         VARCHAR(30) NOT NULL,
     salary        DECIMAL(10, 2) NOT NULL,
     department_id INT NOT NULL,
     foreign key  (department_id) references department(id)
  );

CREATE TABLE employee
  (
     id         INT NOT NULL auto_increment PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name  VARCHAR(30) NOT NULL,
     role_id    INT NOT NULL,
     manager_id INT,
     FOREIGN KEY (role_id) REFERENCES role(id)
  );
