const db = require('./connection');
require('console.table');


class DB_INTERACT {
    constructor(db) {
        this.db = db;
    }

    findAllEmployees() {
        console.log('In all employee');
        const sql = `SELECT * FROM employee`;
        const results = this.db.promise().query(sql).then((rows) => {
            console.table(rows[0]);
        });
        return results;
    }
    findAllDepartments() {
        console.log('In all departments');
        const sql = `SELECT * FROM department`;
        const results = this.db.promise().query(sql).then((rows) => {
            console.table(rows[0]);
        });
        return results;
    }
    async getAllDepts() {
        let dept = [];
        const sql = `SELECT * FROM department`;
        const results = await this.db.promise().query(sql).then((rows) => {
            //console.log(rows[0]);
            rows[0].forEach(row => {
                dept.push(row.name);
          })
        });
        //console.log(dept);
        return dept;
    }
    findAllRoles() {
        console.log('In all roles');
        const sql = `SELECT * FROM role`;
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
        const sql = `INSERT INTO role SET ?`
        return this.db.promise().query(sql, role);
    }
    //create function in this class for each db query/update/delete
    //call each query based on main menu of options from inquirer
        //unless CREATE or UPDATE
            //still query for user to update or table to use
                //ask questions with inquirer to get (for example) new employee info

}
//each time a new connection is created, create a new instance of this class for this connection
module.exports = new DB_INTERACT(db);