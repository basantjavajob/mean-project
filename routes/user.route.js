const express = require('express');
const user_routes = express.Router();

// Require User model in our routes module
let User = require('../models/User');

// Listing all Users
user_routes.route('/').get(function (req, res) {
    User.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(data);
        }
    });
});

// Create New User
user_routes.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save().then(user => {
        res.status(200).json({
            'user': 'User added successfully'
        });
    }).catch(err => {
        res.status(400).send("Uable to save new user to database");
    });
});

// Displaying Existing User details by ID
user_routes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.status(200).json(user);
    });
});

// Updating Existing User details by ID
user_routes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            return next(new Error('User dosnot exists'));
        else {
            user.name = req.body.name;
            user.email = req.body.email;

            user.save().then(user => {
                    res.status(200).json('User Updated successfully');
                })
                .catch(err => {
                    res.status(400).send("Unable to update user record");
                });
        }
    });
});

// Delete User by ID
user_routes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
         if(err) res.status(400).json(err);
         else res.status(200).json('Successfully deleted');
     });
 });

module.exports = user_routes;