import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getUser(params.id).subscribe(data => {
        this.loggedUser = data;
      })
    })
  }

  toEditProfile(){
    this._router.navigate(['/profile/'+this.loggedUser.id+'/edit']);
  }

  logoutFromService(){
    this._httpService.logout().subscribe((data:any) => {
      this._router.navigate(['/login']);
    })
  }

}
