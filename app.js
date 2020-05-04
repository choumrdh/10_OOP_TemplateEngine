const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [];
const managerQuestions = [{
    type: "input",
    name: "name",
    message: "What is your manager's name?",
    validate: function validateName(name) {
        if (name === "") {
            console.log("Please enter name");
            return false
        } else {
            return true
        }
    }
}, {
    type: "input",
    name: "id",
    message: "What is your manager's ID?",
    validate: function validateId(id) {
        if (parseInt(id)) {
            return true
        } else {
            console.log("Please enter a number for ID")
            return false;
        }
    }
}, {
    type: "input",
    name: "email",
    message: "What is your manager's email?",
    validate: function validateEmail(email) {
        if (email.includes("@") && email.includes(".")) {
            console.log(". Thank you for provide a valid email")
            return true;
        } else {
            console.log(". Please Enter a valid email")
            return false;
        }
    }
}, {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
    validate: function validateId(id) {
        if (parseInt(id)) {
            return true
        } else {
            console.log("Please enter a number for ID")
            return false;
        }
    }
}];
const addMemberQuestion = [
    {
        type: "list",
        name: "role",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I do not want to add more team member"]
    }
];
const engineerQuestions = [{
    type: "input",
    name: "name",
    message: "What is the engineer's name?",
    validate: function validateName(name) {
        if (name === "") {
            console.log("Please enter name");
            return false
        } else {
            return true
        }
    }
}, {
    type: "input",
    name: "id",
    message: "What is the engineer's ID?",
    validate: function validateId(id) {
        if (parseInt(id)) {
            return true
        } else {
            console.log("Please enter a number for ID")
            return false;
        }
    }
}, {
    type: "input",
    name: "email",
    message: "What is the engineer's email?",
    validate: function validateEmail(email) {
        if (email.includes("@") && email.includes(".")) {
            console.log(". Thank you for provide a valid email")
            return true;
        } else {
            console.log(". Please Enter a valid email")
            return false;
        }
    }
}, {
    type: "input",
    name: "github",
    message: "What is the engineer's github username?",
}];
const internQuestions = [{
    type: "input",
    name: "name",
    message: "What is the intern's name?",
    validate: function validateName(name) {
        if (name === "") {
            console.log("Please enter name");
            return false
        } else {
            return true
        }
    }
}, {
    type: "input",
    name: "id",
    message: "What is the intern's ID?",
    validate: function validateId(id) {
        if (parseInt(id)) {
            return true
        } else {
            console.log("Please enter a number for ID")
            return false;
        }
    }
}, {
    type: "input",
    name: "email",
    message: "What is the 's email?",
    validate: function validateEmail(email) {
        if (email.includes("@") && email.includes(".")) {
            console.log(". Thank you for provide a valid email")
            return true;
        } else {
            console.log(". Please Enter a valid email")
            return false;
        }
    }
}, {
    type: "input",
    name: "schoolName",
    message: "What is the intern's school?",
}];

function initalize() {
    return inquirer.prompt(managerQuestions)
        .then(res => {
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            employee.push(manager);
            return buildTeam();
        });
};
function buildTeam() {
    return inquirer.prompt(addMemberQuestion)
        .then(addTeam => {
            if (addTeam.role === "Engineer") {
                return inquirer.prompt(engineerQuestions)
                    .then(res => {
                        const engineer = new Engineer(res.name, res.id, res.email, res.github);
                        employee.push(engineer);
                        return buildTeam();
                    });
            } else if (addTeam.role === "Intern") {
                return inquirer.prompt(internQuestions)
                    .then(res => {
                        const intern = new Intern(res.name, res.id, res.email, res.schoolName)
                        employee.push(intern);
                        return buildTeam()
                    });
            } else {
                console.log("Finished adding team member")
                var renderInfo = render(employee)
                try {
                    if (fs.existsSync(OUTPUT_DIR)) {
                        fs.writeFile(outputPath, renderInfo, (err) => {
                            if (err) throw err;
                            console.log("Generate file")
                        });
                    } else {
                        fs.mkdirSync(OUTPUT_DIR)
                        fs.writeFile(outputPath, renderInfo, (err) => {
                            if (err) throw err;
                            console.log("Generate file")
                        });
                    }
                } catch (err) {
                    console.log(err)
                }

            }
        })
};
initalize();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


