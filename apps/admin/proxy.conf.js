const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const target = `http://${HOST}:${PORT}`
module.exports = {
  '/api': { target, secure: false },
  '/graphql': { target, secure: false, ws: true },
}
