import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  passwordCheck: any;
  userToAdd: any;
  errors = [];
  loginreg: any;
  userToLogin: any;
  loginFlag: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginFlag = {status: false};
    this.userToAdd = {first_name: '', last_name: '', email: '', password: '', skill: 'Beginner'};
    this.passwordCheck = {password: '', confirm_password: ''};
    this.userToLogin = {email: '', password: ''};
    navigator.geolocation.getCurrentPosition(data => {
      this.userToAdd.latitude = data.coords.latitude;
      this.userToAdd.longitude = data.coords.longitude;
      this.userToLogin.latitude = data.coords.latitude;
      this.userToLogin.longitude = data.coords.longitude;
      })
  }

  goToLogin(){
    this._router.navigate(['/login']);
  }

  registerFromService(){
    this.errors = [];
    if (this.passwordCheck.password == this.passwordCheck.confirm_password) {
      this.userToAdd.password = this.passwordCheck.password;
      console.log(this.userToAdd);
      this._httpService.register(this.userToAdd).subscribe((data:any) => {
        if (!data.errors){
          this._router.navigate(['profile/'+data.user._id+'/welcome']);
        }
        else {
          for (let error in data.errors){
            this.errors.push(data.errors[error])
          }
        }
      })
    } else {
      this.errors.push("Passwords don't match.");
    }
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

  changeLoginFlag(){
    this.loginFlag.status = !this.loginFlag.status;
    this.errors = [];
  }
}
