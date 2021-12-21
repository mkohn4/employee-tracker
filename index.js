const inquirer = require('inquirer');
const db = require('./db/index');
//console.log(db.findAllEmployees());

const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the Department you wish to add?',
            validate: deptName => {
                if (deptName) {
                    return true;
                } else {
                    console.log('Enter your Department Name!');
                    return false;
                }
            }
        }
    ]).then(department => {
        console.log(department.deptName);
        db.createDepartments(department.deptName);
    }).then(companyPrompts);
};

const addRole = () => {
    // let deptChoices = db.getAllDepts();
    //console.log(db.getAllDepts());
   //console.log(db.getAllDepts());
   let deptsObj;
   db.findAllDepartments().then(data => {
        deptsObj = data;
       return data.map(department => {
           return department.name
       });
   }).then(depts => {
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the Role you wish to add?',
                validate: roleName => {
                    if (roleName) {
                        return true;
                    } else {
                        console.log('Enter your Role Name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the Salary of the Role?',
                validate: salary => {
                    if (salary) {
                        return true;
                    } else {
                        console.log('Enter the Salary!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'depts',
                message: 'Which Department does this Role belong to?',
                choices: depts,
                validate: roleName => {
                    if (roleName) {
                        return true;
                    } else {
                        console.log('Enter your Role Name!');
                        return false;
                    }
                }
            }
        ]).then(role => {
            let a = deptsObj.filter(rows => {
                if (rows.name === role.depts) {
                    return rows.id;
                }
            })
            console.log(a[0].id)
            role.depts = a[0].id;
            console.log(role.roleName+ ' + '+ role.depts+ ' + '+ role.salary);
            db.createRole(role);
        }).then(companyPrompts);
   })
    
}

const addEmployee = () => {
    // let deptChoices = db.getAllDepts();
    //console.log(db.getAllDepts());
   //console.log(db.getAllDepts());
   let rolesObj;
   let employeesObj;
   let rolesArr = [];
   //get all roles
   db.findAllRoles().then(data => {
        rolesObj = data;
       return data.map(role => {
           return role.title
       });
   }).then(roles => {
       //set roles array equal to array names
    rolesArr = roles;
    //find all employees and get first name array
    db.findAllEmployees().then(data => {
        employeesObj = data;
        return data.map(employee => {
            return employee.first_name
        });
    }).then(employeeNames => {
                return inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the first name of the Employee you wish to add?',
                        validate: firstName => {
                            if (firstName) {
                                return true;
                            } else {
                                console.log('Enter a Name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the Last Name of the Employee?',
                        validate: lastName => {
                            if (lastName) {
                                return true;
                            } else {
                                console.log('Enter the last name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Which Role does this Employee belong to?',
                        choices: rolesArr,
                        validate: role => {
                            if (role) {
                                return true;
                            } else {
                                console.log('Enter a Role!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who Manages this Employee?',
                        choices: employeeNames,
                        validate: manager => {
                            if (manager) {
                                return true;
                            } else {
                                console.log('Choose an Option!');
                                return false;
                            }
                        }
                    }
                ]).then(employee => {
                    console.log(rolesObj);
                    console.log(employeesObj);
                    console.log(employee);
                    //get role id from object
                    let roleId = rolesObj.filter(rows => {
                        if (rows.title === employee.role) {
                            return rows.id;
                        }
                    })
                    //get employee id from object
                    let employeeId = employeesObj.filter(rows => {
                        if (rows.first_name === employee.manager) {
                            return rows.id;
                        }
                    })
                    console.log(roleId[0].id);
                    //set employee role equal to role identifier in db
                    employee.role = roleId[0].id;
                    console.log(employeeId[0].id);
                    //set employee manager to the defined managers id
                    employee.manager = employeeId[0].id;
                    //employee.depts = a[0].id;
                    console.log(employee.firstName+ ' + '+ employee.lastName+ ' + '+ employee.role+' + '+employee.manager);
                    db.createEmployee(employee);
                }).then(companyPrompts);
            })
        });
    }    
  


const companyPrompts = () => {

return inquirer.prompt ([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        validate: choice => {
            if (choice) {
                return true;
            } else {
                console.log('Choose Something!');
                return false;
            }
        }
    }
])
.then(companyChoice => {
    switch(companyChoice.choice) {
        case 'View All Departments':
            db.findAllDepartments().then(data => {
                console.table(data);
                companyPrompts();
            });
            break;
        case 'View all Roles':
            db.findAllRoles().then(data => {
                console.table(data);
                companyPrompts();
            });
            break;
        case 'View all Employees':
            db.findAllEmployees().then(data => {
                console.table(data);
                companyPrompts();
            });
            break;
        case 'Add a Department':
            addDepartment();
            //console.table(db.findAllDepartments());
            //companyPrompts();
            break;
        case 'Add a Role':
            addRole();
            //console.table(db.findAllRoles());
            //companyPrompts();
            break;
        case 'Add an Employee':
            addEmployee();
            //console.table(db.findAllEmployees());
            //companyPrompts();
            break;
        default:
            console.log('DEFAULT:'+ companyChoice.choice);

    }
    /*console.log(readmeData);
    readmeData.projects = [];
    //push responses to the readmeData.projects array
    readmeData.projects.push(readmeAnswers);*/
    //return the current data
    //return companyChoice;
})
};

companyPrompts();
//function with
    //one prompt of all options
    //switch statement fn to determine based on selection which next function to run
    //EACH OF THESE REQUIRES A FN
        //view all depts
        //view all roles
        //view all employees
        //add a department
            //inquirer prompt asking for dept name, using the value received
                //.then db.createDepartment(deptName)
        //add a role
        //add employee
            //when adding an employee, query the db for roles in table
            //then bring in those values as dynamic choices
        //update role of an employee    
    //if option is selected 