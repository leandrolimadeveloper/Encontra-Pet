const express = require('express')
const app = express()

const path = require('path')

function pathInCommonJs() {
    app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
}

module.exports = pathInCommonJs
