//  API Routes
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('API')
})

router.get('/users', (req, res)=> {
    res.send('api/ users')
})

module.exports = router