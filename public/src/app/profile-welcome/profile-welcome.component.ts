import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-profile-welcome',
  templateUrl: './profile-welcome.component.html',
  styleUrls: ['./profile-welcome.component.css']
})
export class ProfileWelcomeComponent implements OnInit {
  loggedUser: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getUser(params.id).subscribe(data => {
        this.loggedUser = {id: params['id'], first_name: data['first_name']};
      })
    })
  }

}
