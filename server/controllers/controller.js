const mongoose = require('mongoose');
const User = require('./../models/users');
const bcrypt = require('bcrypt');

module.exports = {

    index: (request, response) => {
        Product.find({}, (err, products) => {
            if (err) {
                console.log("Error encountered while retrieving products.");
                response.redirect('/api/index');
            }
            else{
                console.log("Successfully found all products.");
                response.json(products);
            }
        })
    },

    users_user: (request, response) => {
        console.log('hi');
        User.findOne({_id: request.params.id}, (err, user) => {
            console.log(user);
            if (err) {
                console.log("Errors encountered while finding user.");
                response.redirect('/api/index');
            }
            else {
                console.log("Sucessfully found user.");
                response.json(user);
            }
        })
    },

    new_product: (request, response) => {
        Product.create(request.body, (err, product) => {
            if (err) {
                response.json(err);
            }
            else{
                console.log("Successfully created product.");
                response.json(product);
            }
        })
    },

    update_product: (request, response) => {
        Product.findOne({id: request.params.id}, (errors, product) => {
            if (errors) {
                console.log("Couldn't find that product in our database");
            }
            else {
                console.log("Okay, got the product to update...");
                Product.update(product, {name: request.body.name, quantity: request.body.quantity, price: request.body.price}, (errors, product) => {
                    if (errors) {
                        response.json(errors);
                    }
                    else {
                        console.log("Updated the product!");
                        response.json(product);
                    }
                })
            }
        })
    },

    delete_product: (request, response) => {
        Product.findOneAndRemove({id: request.params.id}, (err, product) => {
            if (err) {
                console.log("Error encountered while deleting product.");
                response.redirect('/api/index');
            }
            else{
                console.log("Deleted the product!");
                response.json(product);
            }
        })
    },

    //START USER LOGIN/REGISTRATION
    register: (request, response) => {
        let errors = [];
        if (request.body.first_name.length == 0){
            errors.push("First name is required.");
        }
        if (request.body.last_name.length == 0){
            errors.push("Last name is required.");
        }
        if (request.body.email.length < 4){
            errors.push("Enter a valid email.");
        }
        if (request.body.password.length < 8){
            errors.push("Password must be at least 8 characters long.");
        }
        if (errors.length > 0){
            return response.json({errors: errors});
        }
        bcrypt.hash(request.body.password, 10, (err, hash) => {
            console.log(request.body);
            User.create({first_name: request.body.first_name, last_name: request.body.last_name, email: request.body.email, password: hash, latitude: request.body.latitude, longitude: request.body.longitude, skill: request.body.skill}, (err, user) => {
                request.session.email = user.email;
                let context = {
                    user: user,
                    session_email: request.session.email
                }
                response.json(context);
            })
        })
    },

    login: (request, response) => {
        console.log("FIRST BODY PRINT: ", request.body)
        User.findOne({email: request.body.email}, (err, user) => {
            if (!user) {
                response.json({errors: "Email does not exist in our records."})
            }
            else {
                console.log("SECOND BODY PRINT: ", request.body);
                console.log("Before location update: ", user);
                User.update(user, {latitude: request.body.latitude, longitude: request.body.longitude}, (err, updatedUser) => {
                    console.log("After location update: ", updatedUser);
                })
                bcrypt.compare(request.body.password, user.password, (error, res) => {
                    if (res){
                        request.session.email = user.email;
                        let context = {
                            user: user,
                            session_email: request.session.email
                        }
                        response.json(context);                    
                        }
                    else {
                        response.json({errors: "Incorrect password."})
                    }
                })
            }
        })
    },

    check_login: (request, response) => {
        response.json({email: request.session.email});
    },

    logout: (request, response) => {
        request.session.destroy();
        response.json({message: "Successfully logged out."});
    },

    getSessionUser: (request, response) => {
        User.findOne({email: request.session.email}, (err, user) => {
            if (err) {
                console.log("Error finding user credentials.");
                response.json({message: "Error finding user credentials."})
            }
            else {
                console.log("Found user credentials");
                response.json(user);
            }
        });
    },

    updateLocation: (request, response) => {
        console.log(request.body);
    }
    //END USER LOGIN/REGISTRATION


}