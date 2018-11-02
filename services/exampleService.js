const HTTPResponseStatus = require('../models/HTTPResponseStatus')

const exampleService = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({ body: 'This is a test' })
    } catch (error) {
      reject(new HTTPResponseStatus(500, error.stack))
    }
  })
}

module.exports = exampleService
