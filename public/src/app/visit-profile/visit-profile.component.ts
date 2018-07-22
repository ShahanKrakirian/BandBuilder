import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css']
})
export class VisitProfileComponent implements OnInit {
  loggedUser: any;
  profileUser: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._httpService.getSessionUser().subscribe((data:any) => {
      this.loggedUser = data;
    })
    this._route.params.subscribe((params: Params) => {
      console.log(params);
      this._httpService.getUser(params.id).subscribe((data:any) => {
        this.profileUser = data;
      })
    })
  }

  logoutFromService(){
    this._httpService.logout().subscribe((data:any) => {
      this._router.navigate(['/login']);
    })
  }

  createMessageFromService(senderId, receiverId){
    this._httpService.createMessage(senderId, receiverId).subscribe((data: any) => {
      console.log(data);
    })
  }

}
