const proxy = require('express-http-proxy')
const express = require('express')
const app = express()
const port = 8080

app.use((req, res, next) => {
    console.log('proxy')
    next()
})
app.use('/', proxy('http://localhost:3000'))

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
})
