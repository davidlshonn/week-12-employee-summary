const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Team member info is gathered using inquirer to create objects for each team member

const teamMembers = [];

function initialiseCreatingTeam() {
  //Inquirer is utilised to prompt the user for their managers info
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is your managers name?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is your manager's id?",
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is your manager's email?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is your manager's office number?",
        },
      ])
      //Takes user input and creates new manager object
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.officeNumber
        );
        teamMembers.push(manager);
        createNextTemMember();
      });
  }
  //Prompt to see if user wants to add other team members
  function createNextTemMember() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "teamMember",
          message: "What is the role for the team member you want to add next?",
          choices: ["Engineer", "Intern", "None"],
        },
      ])
      //if either engineer or intern are selected, their prompts are produced. If not the html is created.
      .then((answer) => {
        if (answer.teamMember === "Engineer") {
          createEngineer();
        } else if (answer.teamMember === "Intern") {
          createIntern();
        } else {
          console.log("in");
          createHtml();
        }
      });
  }
  //Inquirer is utilised to prompt the user for their engineers info
  function createEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineers name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's ID?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's github?",
        },
      ])
      //Takes user input and creates new engineer object
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        createNextTemMember();
      });
  }
  //Inquirer is utilised to prompt the user for their interns info
  function createIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's ID?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
        },
      ])
      //Takes user input and creates new intern object
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        createNextTemMember();
      });
  }
  //render function is called and employee array is passed in.
  function createHtml() {
    if (fs.existsSync(OUTPUT_DIR) === false) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers));
  }
  createManager();
}

initialiseCreatingTeam();
