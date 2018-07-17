import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedUser: any;
  loginreg: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  
  ngOnInit() {
    this.loggedUser = {id: ''};
    this.checkLoginStatus();
  }

  checkLoginStatus(){
    this._httpService.checkLogin().subscribe((data: any) => {
      if (data.email){
        // this._router.navigate(['/home']);
      } else {
        console.log("cannot find user, redirecting to register")
        this._router.navigate(['/register']);
      }
    })
  }

}
