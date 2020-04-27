# Reading List

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

## Getting Started

The Reading List application requires `node` and `npm` to be installed on your machine. It has been tested on `node v12.16.0` and `npm v6.13.4` and is not guaranteed to work on earlier versions. You can check to see if you have node installed with `which node` and you can check the version with `node --version`. Similarly, you can check to see if you have npm installed with `which npm` and the version with `npm --version`. If these dependencies are not currently installed, please visit the following resources to install them.

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

Once node and npm have been installed, clone the Reading List repository with

`git clone git@github.com:djbowers/reading-list.git`

Next, open the directory and install the application's dependencies with

`cd reading-list/` and `npm install`

Once the dependencies have been installed, run the application with

`npm start`

To execute the test suite, run

`npm test`

## Approach

In the first version of this application, I used various npm modules like `inquirer`, `prompt-sync`, and the built-in `events` module to "get the job done." After review by 8th Light and further inspection, I realized that I had not only violated several of the [SOLID principles](https://medium.com/better-programming/solid-principles-simple-and-easy-explanation-f57d86c47a7f) for software development, but I also had several other more obvious errors such as code duplication and poor naming.

For the second version of the app, I decided to break the ReadingList class into several smaller modules and reduce the number of external dependencies. The following architecture emerged:

- **app**: main application code
- **books**: deals with the creation of Book objects
- **google-api**: holds the call to the Google Books API
- **prompts**: wrapper for `inquirer` prompts
- **reading-list**: lightweight class to represent the actual Reading List
- **user-interface**: all console.log, console.table, and prompts to the CLI

My first step in implementing the 8th Light review feedback was to remove the `prompt-sync` module and replace it entirely with `inquirer`.

Next, I moved the single API call in the application, the call to the Google Books API, into its own module, `google-api`.

I then moved all calls to the inquirer package into the `prompts` module to keep them isolated. I also created a separate `user-interface` module to contain all of the UI functionality, including console.log and console.table statements and calls to the `prompts` module. By doing this, I allow for easy extension of the application by swapping out the `user-interface` class with another module, such as a new graphical user interface.

While removing functionality from the `ReadingList` class, I realized that there was actually very little functionality that should remain in the actual `ReadingList`. The only methods that I kept in this class were the ability to get all of the books on the list and to add a book to the list. Everything else was moved to the UI layer, the API layer, or the App itself.

## Testing

This second version of the application currently has 14 tests. Some of these tests, such as those for the `reading-list` and `books` modules, are true unit tests. Others, such as those for the `google-api` and `prompts` modules, are integration tests.

I used `mocha` as my test runner and `chai` for assertions, as well as `nyc` for test coverage. I also used a package called `bdd-stdin` to supply input via stdin to test the `prompts` module.

My next steps in extending the testing suite and covering more of the application with tests would be to write end-to-end tests using the `bdd-stdin` module to exercise the application from start to finish.

In addition, I used the `eslint` module to lint my application for small style offenses.

## Dependencies

### Main

- node
- npm
- axios: used for API calls
- inquirer: used for user prompts

### Dev

The following dependencies are not needed to run the application, just to run the test suite.

- bdd-stdin
- chai
- eslint
- mocha
- nyc
