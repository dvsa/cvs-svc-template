const exampleService = require('../services/exampleService')

const exampleFunction = async () => {
  return exampleService()
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch((error) => {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify(error.body)
      }
    })
}

module.exports = exampleFunction
