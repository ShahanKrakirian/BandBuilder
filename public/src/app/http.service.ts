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
    console.log(userToLogin);
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
    console.log(loggedUser);
    return this._http.post('api/updateLocation', loggedUser);
  }

}
