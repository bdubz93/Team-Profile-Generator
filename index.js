const filename = `./dist/team.html`;

const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require('fs');


const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");


let listManager = [];
let listEngineer = [];
let listIntern = [];
let listID = [];
let innHTML=``;


function askQuestion() {
    inquirer.prompt([
        {
            message: "What would you like to do next?",
            type: "list",
            name: "question",
            choices: ["Add an Engineer", "Add an Intern", "Finish building my team"]
        }
    ]).then(answers => {
        switch (answers.question) {
            case "Add an Engineer":
                console.log(chalk.blue('Add an Engineer'));
                askID('Engineer');
                break;
            case "Add an Intern":
                console.log(chalk.blue('Add an Intern'));
                askID('Intern');
                break;
            case "Finish building my team":
                console.log(chalk.blue('Finish building my team'));
                generateHTML();
                break;
            default:
                break;
        }
    })
}


function askID(type) {
    inquirer.prompt([
        {
        type: 'number',
        message: `What is their ID #?`,
        name: 'ID',
        },
    ]).then(({ID}) => {
        if(listID.includes(ID) || Number.isNaN(ID)) {
            if(Number.isNaN(ID)) {
                console.log(chalk.red(`ERROR: Not a number!`)); } else {
                console.log(chalk.red(`ERROR: ID#${ID} is already in use!`));
            }
            askID(type); 
        } else {
            listID.push(ID);
            switch (type) {
                case 'Manager':
                    addManager(ID);                    
                    break;
                case 'Engineer':
                    addEngineer(ID);                    
                    break;
                case 'Intern':
                    addIntern(ID);                    
                    break;          
                default:
                    break;
            }
        }
    });
}


function addManager(mID) {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Manager's Name?`,
            name: 'mName',
        },
        {
            type: 'input',
            message: `What is your Manager's email?`,
            name: 'mEmail',
        },
        {
            type: 'input',
            message: `What office number will they be assigned?`,
            name: 'mOfficenum',
        },
    ]).then(({mName,mEmail,mOfficenum}) => {
        const manager = new Manager(mName, mID, mEmail, mOfficenum);
        listManager.push(manager);
        askQuestion();
    })
}

function addEngineer(eID) {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Engineer's Name?`,
            name: 'eName',
        },
        {
            type: 'input',
            message: `What is your Engineer's email?`,
            name: 'eEmail',
        },
        {
            type: 'input',
            message: `What is your Engineer's Github?`,
            name: 'eGithub',
        },
    ]).then(({eName,eEmail,eGithub}) => {
        const engineer = new Engineer(eName, eID, eEmail, eGithub);
        listEngineer.push(engineer);
        askQuestion();
    });
}

function addIntern(iID) {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is your Intern's Name?`,
            name: 'iName',
        },
        {
            type: 'input',
            message: `What is your Intern's email?`,
            name: 'iEmail',
        },
        {
            type: 'input',
            message: `What is your Intern's school?`,
            name: 'iSchool',
        },
    ]).then(({iName,iEmail,iSchool}) => {
        const intern = new Intern(iName, iID, iEmail, iSchool);
        listIntern.push(intern);
        askQuestion();
    });
}

function generateHTML() {
    innHTML += `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <title>Team Profile Generator</title>
</head>

<body>

    <nav class="navbar navbar-dark bg-dark display-3 text-white justify-content-center">My Team</nav>

    <!-- Managers  -->
    <div class="row justify-content-center p-2" id="Managers">
`;  
    listManager.forEach(element => {
        innHTML += `
    <div class="col-4 card bg-light m-2 p-0 shadow" style="width: 15rem; ">
        <div class="card-header bg-primary text-white">
            <div>${element.name}</div>
            <div><i class="fas fa-mug-hot"></i> Manager</div>
        </div>
        <div class="m-2 border">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${element.id}</li>
              <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
              <li class="list-group-item">Office number ${element.officeNumber}</a></li>
            </ul>
        </div>
    </div>
`;
    });    
    innHTML +=`
        </div>

    <!-- Engineers  -->
        <div class="row justify-content-center p-2" id="Engineers">
`;
    
    listEngineer.forEach(element => {
    innHTML += `
<div class="col-4 card bg-light m-2 p-0 shadow" style="width: 15rem;">
    <div class="card-header bg-primary text-white">
        <div>${element.name}</div>
        <div><i class="fas fa-glasses"></i> Engineer</div>
    </div>
    <div class="m-2 border">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${element.id}</li>
          <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
          <li class="list-group-item">Github: <a href="https://github.com/${element.github}" target="_blank">${element.github}</a></li>
        </ul>
    </div>
</div>
`;
});
    innHTML +=`
    </div>
    <!-- Interns  -->
    <div class="row justify-content-center p-2" id="Interns">
`
        listIntern.forEach(element => {
            innHTML += `
        <div class="col-4 card bg-light p-0 m-2 shadow" style="width: 15rem;">
            <div class="card-header bg-primary text-white">
                <div>${element.name}</div>
                <div><i class="fas fa-user-graduate"></i> Intern</div>
            </div>
            <div class="m-2 border">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${element.id}</li>
                  <li class="list-group-item">Email: <a href="mailto:${element.email}">${element.email}</a></li>
                  <li class="list-group-item">School: ${element.school}</li>
                </ul>
            </div>
        </div>
        `;
        });           
        innHTML +=`

        <footer>
            <nav class="navbar navbar-light bg-dark fixed-bottom text-white justify-content-center">
                Team Profile Generator
            </nav>
        </footer>
    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </body>
    </html>
`;
    fs.writeFile(filename, innHTML, (err) =>
    err ? console.error(err) : console.log(chalk.green('Profiles Saved')));
}

askID('Manager');
