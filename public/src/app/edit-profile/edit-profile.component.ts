import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  loggedUser: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getUser(params.id).subscribe(data => {
        this.loggedUser = {id: params['id'], first_name: data['first_name'], last_name: data['last_name'], email: data['email']};
      })
    })
  }

  logoutFromService(){
    this._httpService.logout().subscribe((data:any) => {
      this._router.navigate(['/login']);
    })
  }

}
