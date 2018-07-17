const mongoose = require('mongoose');
const User = require('./../models/users');
const bcrypt = require('bcrypt');

module.exports = {

    index: (request, response) => {
        User.find({}, (err, users) => {
            if (!users) {
                console.log("Error encountered while retrieving users.");
                response.json({message: "Could not retrieve users."});
            }
            else{
                console.log("Successfully found all users.");
                response.json(users);
            }
        })
    },

    usersUser: (request, response) => {
        console.log(request.params);
        User.findOne({_id: request.params.id}, (err, user) => {
            if (err) {
                console.log("Errors encountered while finding user.");
                response.redirect('/api/index');
            }
            else{
                console.log("Sucessfully found user.");
                response.json(user);
            }
        })
    },

    editProfile: (request, response) => {
        User.findOne({_id: request.body._id}, (err, user) => {
            if (!user) {
                response.json({message: "Couldn't find user to update."});
            }
            else{
                User.update(user, {first_name: request.body.first_name, last_name: request.body.last_name, bio: request.body.bio, email: request.body.email, skill: request.body.skill}, (err, updated) => {
                    response.json(updated);
                })
            }
        })
    },

    addInstrument: (request, response) => {
        User.findOne({_id: request.body._id}, (err, user) => {
            if (!user) {
                response.json({message: "Couldn't find user to update."});
            }
            else {
                User.update(user, {$push: {instruments: request.body.instruments}}, (err, updated) => {
                    response.json(updated);
                })
            }
        })
    },

    removeInstrument: (request, response) => {

        User.findOne({_id: request.params.id}, (err, user) => {
            if (!user) {
                response.json({message: "Couldn't find user to update."});
            }
            else {
                User.update(user, {$pull: {instruments: request.body.Instrument}}, (err, updated) => {
                    response.json(updated);
                })
            }
        })
    },

    addGenre: (request, response) => {
        console.log("REQUEST BODY: ", request.body);
        User.findOne({_id: request.body._id}, (err, user) => {
            if (!user) {
                response.json({message: "Couldn't find user to update."});
            }
            else {
                User.update(user, {$push: {genres: request.body.genres}}, (err, updated) => {
                    response.json(updated);
                })
            }
        })
    },

    removeGenre: (request, response) => {

        User.findOne({_id: request.params.id}, (err, user) => {
            if (!user) {
                response.json({message: "Couldn't find user to update."});
            }
            else {
                User.update(user, {$pull: {genres: request.body.Genre}}, (err, updated) => {
                    response.json(updated);
                })
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
        User.findOne({email: request.body.email}, (err, user) => {
            if (!user) {
                response.json({errors: "Email does not exist in our records."})
            }
            else {
                User.update(user, {latitude: request.body.latitude, longitude: request.body.longitude}, (err, updatedUser) => {
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

    checkLogin: (request, response) => {
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
    },
    //END USER LOGIN/REGISTRATION

    getSearchResults: (request, response) => {

        //Based on search criteria...
        if (request.body.searchBy == "instrument"){
            User.find({instruments: request.body.input}, (err, users) => {
                if (!users){
                    response.json({message: "No users met criteria."});
                } else {
                    response.json(users);
                }
            })   
        } else if (request.body.searchBy == "genre"){
            User.find({genres: request.body.input}, (err, users) => {
                if (!users){
                    response.json({message: "No users met criteria."});
                } else {
                    response.json(users);
                }
            })
        //Skill
        } else {
            User.find({skill: request.body.input}, (err, users) => {
                if (!users){
                    response.json({message: "No users met criteria."});
                } else {
                    response.json(users);
                }
            })
        }
    }
}