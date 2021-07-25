const express = require('express')
const app = express()
const port = 3000
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

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
    store: new RedisStore({
        expiry: 1,
        redisURL: 'redis://localhost:6379'
    }),
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
