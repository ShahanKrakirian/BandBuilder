import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css'],
  
})
export class VisitProfileComponent implements OnInit {
  loggedUser: any;
  profileUser: any;
  messageToAdd: any;
  messages: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    //Initialize variables
    this.messages = [];
    this.messageToAdd = {body: ""};
    //Get session user
    this._httpService.getSessionUser().subscribe((data:any) => {
      this.loggedUser = data;
      //Get visited user info
      this._route.params.subscribe((params: Params) => {
        this._httpService.getUser(params.id).subscribe((data1:any) => {
          this.profileUser = data1;
          //Populate messages with existing conversation between users
          this._httpService.createMessage(this.loggedUser._id, this.profileUser._id, {bool:true}).subscribe((data2: any) => {
            if (data2.content){
              for (var i=data2.content.length-1; i>=0; i--){
                this.messages.push(data2.content[i]);
              }
            }
          })
        })
      })
    })
  }

  logoutFromService(){
    this._httpService.logout().subscribe((data:any) => {
      this._router.navigate(['/login']);
    })
  }

  createMessageFromService(senderId, receiverId, bool){

    this.messages = [];
    var info = {
      messageBody: this.messageToAdd.body,
      bool: bool
    }
    this._httpService.createMessage(senderId, receiverId, info).subscribe((data: any) => {
      console.log("What is data:");
      console.log(data);
      if (data.content){
        for (var i=data.content.length-1; i>=0; i--){
          this.messages.push(data.content[i]);
        }
      }
    })
    this.messageToAdd.body = "";
  }
}
