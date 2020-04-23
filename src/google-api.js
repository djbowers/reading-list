const axios = require('axios').default

async function requestBooks(query) {
  const response = await axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books`
    )
    .catch((error) => console.log(error))
  return response.data.items
}

module.exports = { requestBooks }
