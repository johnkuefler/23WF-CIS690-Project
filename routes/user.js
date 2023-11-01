var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', async function (req, res, next) {
    // fetch all users from database
    let users = await User.find();
    res.render('users/index', { userData: users });
});

router.post('/create', async function (req, res, next) {
    let newUser = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
    );

    try {
        await newUser.save();
    } catch (err) {
        console.log(err);
    }

    res.redirect('/users');
});

router.get('/update', async function (req, res) {
    let id = req.query._id;

    let user = await User.findById(id);
    res.render('users/edit', { userData: user });
});

router.post('/update', async function (req, res) {
    let id = req.body._id;

    await User.findOneAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    res.redirect('/users');
});

router.get('/delete', async function (req, res) {
    
        let id = req.query._id;
    
        await User.findByIdAndDelete(id);
    
        res.redirect('/users');
    });