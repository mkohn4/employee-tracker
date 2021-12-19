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
    })
};

const addRole = () => {
    // let deptChoices = db.getAllDepts();
    console.log(db.getAllDepts());
   //console.log(db.getAllDepts());
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
            message: 'Which Department des this Role belong to?',
            choices: db.getAllDepts(),
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
        console.log(role.roleName);
        //db.createRole(role.roleName);
    })
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
            console.table(db.findAllDepartments());
            break;
        case 'View all Roles':
            console.table(db.findAllRoles());
            break;
        case 'View all Employees':
            console.table(db.findAllEmployees());
            break;
        case 'Add a Department':
            addDepartment();
            //console.table(db.findAllDepartments());
            break;
        case 'Add a Role':
            addRole();
            //console.table(db.findAllRoles());
            break;
        case 'Add an Employee':
            //console.table(db.findAllEmployees());
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