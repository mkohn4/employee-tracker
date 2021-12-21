const db = require('./connection');
require('console.table');


class DB_INTERACT {
    constructor(db) {
        this.db = db;
    }

    findAllEmployees() {
        console.log('In all employee');
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                    role.title, role.salary, department.name 
                    FROM employee LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id`;
        const results = this.db.promise().query(sql).then((rows) => {
            console.table(rows[0]);
        });
        return results;
    }
    findAllDepartments() {
        console.log('In all departments');
        const sql = `SELECT * FROM department`;
        const results = this.db.promise().query(sql).then((rows) => {
            return rows[0];
        });
        return results;
    }
     /*getAllDepts() {
        //running into promise and/or scoping issue with getting array of depts
        const sql = `SELECT name FROM department`;
        const results = this.db.promise().query(sql).then((rows) => {
            return rows[0];
        });
        console.log(results);
        return results;
    }*/
    findAllRoles() {
        console.log('In all roles');
        const sql = `SELECT role.id, role.title, role.salary, department.name FROM role 
                    LEFT JOIN department ON role.department_id = department.id`;
        const results = this.db.promise().query(sql).then((rows) => {
            console.table(rows[0]);
        });
        return results;
    }

    createDepartments(department) {
        const sql = `INSERT INTO department (name) VALUES(?)`
        return this.db.promise().query(sql, department);
    }
    createEmployee(employee) {
        const sql = `INSERT INTO employee SET ?`
        return this.db.promise().query(sql, employee);
    }
    createRole(role) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
        const params = [role.roleName, role.salary, role.depts]
        return this.db.promise().query(sql, params);
    }
    //create function in this class for each db query/update/delete
    //call each query based on main menu of options from inquirer
        //unless CREATE or UPDATE
            //still query for user to update or table to use
                //ask questions with inquirer to get (for example) new employee info

}
//each time a new connection is created, create a new instance of this class for this connection
module.exports = new DB_INTERACT(db);