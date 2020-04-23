const App = require('./app')
const ReadingList = require('./reading-list')
const UserInterface = require('./user-interface')

const readingList = new ReadingList()
const userInterface = new UserInterface()
const app = new App(readingList, userInterface)
app.start()
