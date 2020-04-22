const axios = require('axios').default

async function requestBooks(query) {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books`
    )
    .catch((error) => console.log(error))
}

module.exports = { requestBooks }
