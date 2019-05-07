const express = require('express')
const router = express.Router()
const User = require('../models/users')

//User routes
router.get('/', (req, res) => {
    User.find({}, (err, user)=> {
        if(err) {
            return res.send(err)
        }
        res.render('./users/index.hbs', {
            title: 'Users',
            users: user
        })
    })

})

router.get('/new', (req, res) => {
    res.render('./users/new.hbs', {
        title: 'New User'
    })
})

router.post('/add', (req, res) => {
    let newUser = new User()
    newUser.name.first = req.body.first_name
    newUser.name.last = req.body.last_name
    newUser.bio = req.body.bio
    newUser.email = req.body.email

    newUser.save(() => {
        console.log(newUser)
        console.log('User Created!')
        console.log('User Has Been Saved to db.')
        res.redirect('back')
    })
})

//delete user from db
router.post('/:id/delete', (req, res) => {
    User.findOneAndRemove({_id: req.params.id}, (err, user) => {
        console.log(user)
        res.send('user deleted')
    })
})

//edit user information
router.get('/:id/edit', (req, res) => {
    User.findOne({_id: req.params.id}, (err, user)=> {
        res.render('./users/edit.hbs', {
            title: 'Edit User',
            user: user
        })
    })
})

router.post('/:id/edit_user', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, {email: req.body.email, name: {first: req.body.first_name}}, (err, user) => {
        res.redirect('/users')
    })
})

module.exports = router