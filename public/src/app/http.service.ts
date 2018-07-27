import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  //USER LOGIN/REG
  register(userToAdd){
    return this._http.post('/api/register', userToAdd);
  }

  login(userToLogin){
    return this._http.post('/api/login', userToLogin);
  }

  checkLogin(){
    return this._http.get('/api/checklogin');
  }

  logout(){
    return this._http.get('/api/logout');
  }
  //USER LOGIN/REG

  getUser(id){
    return this._http.get('/api/getUser/'+id);
  }

  getSessionUser(){
    return this._http.get('/api/getSessionUser');
  }

  updateLocation(loggedUser){
    return this._http.post('api/updateLocation', loggedUser);
  }

  getAllUsers(){
    return this._http.get('/api/getUsers');
  }

  addInstrument(user){
    return this._http.post('/api/addInstrument', user);
  }

  removeInstrument(instrument, loggedUserId){
    return this._http.post('/api/removeInstrument/' + loggedUserId, {"Instrument": instrument});
  }

  addGenre(user){
    return this._http.post('/api/addGenre', user);
  }

  editProfile(user){
    return this._http.post('/api/editProfile', user);
  }

  getSearchResults(searchParameters){
    return this._http.post('/api/getSearchResults', searchParameters);
  }

  removeGenre(genre, loggedUserId){
    return this._http.post('/api/removeGenre/' + loggedUserId, {"Genre": genre});
  }

  createMessage(senderId, receiverId, messageBody){
    return this._http.post('/api/createMessage/' + senderId + "/" + receiverId, messageBody);
  }

}
