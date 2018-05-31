import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loggedUser = {id: ''};
    navigator.geolocation.getCurrentPosition(this.initialize);
    this.getSessionUserFromService();
  }

  initialize(location){
    //Generate map centered around current user
    var myLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var mapOptions = {
      center: myLatlng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });

    //Add markers for every other user in database.... limit this to a radius later.
    
  }

  logoutFromService(){
    this._httpService.logout().subscribe(data => {
      if (data) {
        this._router.navigate(['/login']);
      }
    })
  }

  toProfile(){
    this._httpService.getSessionUser().subscribe((data:any) => {
      this._router.navigate(['/profile/'+data._id]);
    })
  }

  getSessionUserFromService(){
    this._httpService.getSessionUser().subscribe((data:any) => {
      this.loggedUser.id=data._id;
      this.loggedUser.first_name=data.first_name
      console.log(this.loggedUser.id);
    })
  }



}
