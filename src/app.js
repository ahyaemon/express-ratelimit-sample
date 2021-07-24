const express = require('express')
const app = express()
const port = 3000
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1000,
    max: 3,
});

app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
