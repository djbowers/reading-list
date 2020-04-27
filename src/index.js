const App = require('./app')
const ReadingList = require('./reading-list')
const UserInterface = require('./user-interface')
const googleApi = require('./google-api')

const readingList = new ReadingList()
const userInterface = new UserInterface()
const app = new App(readingList, userInterface, googleApi)
app.start()
