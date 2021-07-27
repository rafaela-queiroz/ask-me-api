/**
 * Esse index.js serve pra exportar
 * de forma dinâmica os arquivos JSON com nossos mock
 */

const fs = require('fs');
const path = require('path')
const baseName = path.basename(__filename)

const mocks = {}

fs.readdirSync(`${__dirname}/`)
  .filter(file => file.indexOf('.') !== 0 && file !== baseName)
  .forEach(file => {
    Object.assign(mocks, { [file.slice(0, file.lastIndexOf('.'))]: require(path.join(__dirname, file))})
  })
module.exports = mocks