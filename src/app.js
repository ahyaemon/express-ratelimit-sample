const express = require('express')
const app = express()
const port = 3000
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1000,
    max: (req, res) => {
        console.log('limiter max')
        if (req.headers.token) {
            return 5
        }

        return 3
    },
    keyGenerator: (req, res) => {
        console.log('limiter keyGenerator')
        if (req.headers.token) {
            return req.headers.token
        }
        return req.ip
    },
});

app.use(limiter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
