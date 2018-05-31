import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userToLogin: any;
  errors = [];
  loginreg: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(data => {
      this.userToLogin.latitude = data.coords.latitude;
      this.userToLogin.longitude = data.coords.longitude;
      })
    this.userToLogin = {email: '', password: ''};
  }

  goToRegister(){
    this._router.navigate(['/register']);
  }

  loginFromService(){
    this.errors=[];
    this._httpService.login(this.userToLogin).subscribe((data: any) => {
      if (data.errors) {
        this.errors.push(data.errors);
      }
      else{
        this._router.navigate(['/home']);
      }
    })
  }
}
