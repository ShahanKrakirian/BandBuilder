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
  searchResults: any;
  noResults: any;
  currLocation: any;
  searchInstrument: any;
  searchGenre: any;
  searchSkill: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loggedUser = {_id: ''};
    this.searchResults = {searchBy: 'instrument', input: ''};
    navigator.geolocation.getCurrentPosition((data:any) => {
      this.currLocation = data;
      this.initialize(data, false);
    });
    this.getSessionUserFromService();
  }

  initialize(location, searchData){
    //Generate map centered around current user
    var myLatlng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var mapOptions = {
      center: myLatlng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
    });

    if (searchData == false){
    //Add markers for every other user in database.... limit this to a radius later.
      this._httpService.getAllUsers().subscribe((data:any) => {
        for (var i=0; i<data.length; i++) {
          var contentString = "<a href=\"/user/"+data[i]._id+"\">"+data[i].first_name+"</a>";
          var Latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
          var additionalMarker = new google.maps.Marker({
            position: Latlng,
            map: map,
          });
          this.attachSecretMessage(additionalMarker, contentString);
        }
      })
    } else {
        for (var i=0; i<searchData.length; i++) {
          var contentString = "<a href=\"/user/"+searchData[i]._id+"\">"+searchData[i].first_name+"</a>";
          var Latlng = new google.maps.LatLng(searchData[i].latitude, searchData[i].longitude);
          var additionalMarker = new google.maps.Marker({
            position: Latlng,
            map: map,
        });
        this.attachSecretMessage(additionalMarker, contentString);
      }
    }
  }

  navigateToUser(id){
    this._router.navigate(['/user', id]);
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
        this._router.navigate(['/register']);
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

  getSearchResultsFromService(){
    console.log(this.searchResults);
    this._httpService.getSearchResults(this.searchResults).subscribe((data:any) => {
      if (data.length == 0){
        this.initialize(this.currLocation, false);
        this.noResults = true;
      } else {
        this.initialize(this.currLocation, data);
      }
    }) 
  }

  testing(){
    console.log("Success");
  }


}
