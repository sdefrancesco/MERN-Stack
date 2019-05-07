const express = require('express')
const multer = require('multer')
const router = express.Router()
const upload = multer({ dest: 'public/uploads/items/' })

const Item = require('../models/item')

router.get('/', (req,res) => {
    Item.find({}, (err, item) => {
        if(err) {
            return res.json(err)
        }
        return res.render('./items', {
            title: 'Items',
            items: item,
            layout: './layouts/product.hbs',
        })
    })
})

router.get('/new', (req, res) => {
    res.render('./items/new.hbs' , {
        title: 'New Item',       
    })
})

router.post('/new', upload.single('thumbnail'), (req,res) => {
    let newItem = new Item()
    newItem.title = req.body.title
    newItem.description = req.body.description
    newItem.price = req.body.price
    newItem.quantity = req.body.quantity
    newItem.thumbnail = req.file.filename
    newItem.save(() => {
        console.log('Item created: ' + newItem)
        res.redirect('/items')
    })
})

module.exports = router