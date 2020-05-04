const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestions =[
     {
        type: "input",
        name: "Name",
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
        name: "Id",
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
    }]
const addMemberQuestion=[
    {
        type:"list",
        name:"role",
        message:"Which type of team member would you like to add?",
        choices:["Engineer", "Intern", "No More Team"]
    }
];
const engineerQuestions=[
    {
        type: "input",
        name: "Name",
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
        name: "Id",
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
        name: "engineerGithub",
        message: "What is the engineer's github username?",
    }
]
const internQuestions=[
    {
        type: "input",
        name: "Name",
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
        name: "Id",
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
    }
]

function initalize (){
    inquirer.prompt(managerQuestions)
    .then (res=>{
        console.log(res);
        buildTeam()
    });
};
function buildTeam(){
    inquirer.prompt(addMemberQuestion)
    .then(res=>{
        if (res.role === "Engineer"){
            return inquirer.prompt(engineerQuestions)
            .then(res=>{
                console.log(res);
                buildTeam()
            });
        } else if (res.role ==="Intern"){
            return inquirer.prompt(internQuestions)
            .then(res=>{
                console.log(res);
                buildTeam()
            });     
        } else {
            console.log("Finished adding team member")
        }
    })
}
initalize();

// inquirer.prompt(managerQuestions)
// .then(res => {
//     console.log(res)
//     inquirer.prompt(addMemberQuestion)
//     .then(res=> {
//         console.log(res)
//         if(res === "Engineer"){
//             inquirer.prompt(engineerQuestions)
//         } else if(res === "Intern"){
//             inquirer.prompt(internQuestions)
//         } else if(res ==="No More Team"){
//             console.log("finished adding member")
//         }
//     }).catch(err=>{
//         console.log(err)
//     })
// })

// .catch(err => {
//     console.log(err)
// })


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


