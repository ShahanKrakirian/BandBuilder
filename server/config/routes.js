const mongoose = require('mongoose');
const path = require('path');
const controller = require('./../controllers/controller');

module.exports = (app) => {
    //START USER LOGIN/REGISTRATION
    app.get('/api/checklogin', (request, response) => {
        controller.checkLogin(request, response);
    })

    app.post('/api/register', (request, response) => {
        controller.register(request, response);
    })

    app.post('/api/login', (request, response) => {
        controller.login(request, response);
    })

    app.get('/api/logout', (request, response) => {
        controller.logout(request, response);
    })

    app.get('/api/getSessionUser', (request, response) => {
        controller.getSessionUser(request, response);
    })

    app.post('/api/updateLocation', (request, response) => {
        controller.updateLocation(request, response);
    })
    //END USER LOGIN/REGISTRATION

    app.get('/api/getUsers', (request, response) => {
        controller.index(request,response);
    })

    app.get('/api/getUser/:id', (request, response) => {
        controller.usersUser(request,response);
    })
    
    app.post('/api/products/new', (request, response) => {
        controller.new_product(request, response);
    })

    app.put('/api/products/update/:id', (request, response) => {
        controller.update_product(request, response);
    })

    app.delete('/api/products/delete/:id', (request, response) => {
        controller.delete_product(request, response);
    })
    app.post('/api/addInstrument', (request, response) => {
        controller.addInstrument(request, response);
    })
    app.post('/api/removeInstrument', (request, response) => {
        controller.removeInstrument(request, response);
    })
    app.post('/api/addGenre', (request, response) => {
        controller.addGenre(request, response);
    })
    app.post('/api/removeGenre', (request, response) => {
        controller.removeGenre(request, response);
    })
    app.post('/api/editProfile', (request,response) => {
        controller.editProfile(request, response);
    })
    app.all("*", (request, response, next) => {
        response.sendFile(path.resolve("./public/dist/public/index.html"));
      });

}