const inquirer = require('inquirer')

function listPrompt(message, choices) {
  const question = {
    type: 'list',
    name: 'choice',
    message: message,
    choices: choices,
  }

  return inquirer.prompt([question]).catch((error) => console.log(error))
}

function inputPrompt(message) {
  const question = {
    type: 'input',
    name: 'query',
    message: message,
  }

  return inquirer.prompt([question]).catch((error) => console.log(error))
}

module.exports = { listPrompt, inputPrompt }
