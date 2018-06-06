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
    this.loggedUser = {_id: ''};
    navigator.geolocation.getCurrentPosition((data:any) => {
      this.initialize(data);
    });
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
      map: map,
    });

    //Add markers for every other user in database.... limit this to a radius later.
    this._httpService.getAllUsers().subscribe((data:any) => {
      for (var i=0; i<data.length; i++) {
        var contentString = "<a href=\"http://127.0.0.1:6789/user/"+data[i]._id+"\">"+data[i].first_name+"</a>";
        // var contentString = "<a href=\"/profile/"+this.loggedUser._id+"\">"+data[i].first_name+"</a>"; //Doesn't work (link to logged user profile is clickable but redirects back home)
        // var contentString = "<a [routerLink]=\"['/user/29837492']\">Something</a>" //Doesn't work(Can't click link)
        console.log(contentString);
        var Latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
        var additionalMarker = new google.maps.Marker({
          position: Latlng,
          map: map,
        });
        this.attachSecretMessage(additionalMarker, contentString);
      }
    })
  }

  attachSecretMessage(marker, link) {
    var infowindow = new google.maps.InfoWindow({
      content: link
    });

    marker.addListener('click', function() {
      infowindow.open(marker.get('map'), marker);
    });
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
      this.loggedUser._id=data._id;
      this.loggedUser.first_name=data.first_name
    })
  }



}
