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
  instruments = ["Bass", "Drums", "Guitar", "Keyboard", "Vocals"];
  genres = ["Blues", "Funk", "Jazz", "Rock", "Ska"];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getUser(params.id).subscribe(data => {
        this.loggedUser = data;
        this.loggedUser.instruments = "Bass";
        this.loggedUser.genres = "Blues";
      })
    })
  }

  logoutFromService(){
    this._httpService.logout().subscribe((data:any) => {
      this._router.navigate(['/login']);
    })
  }

  editProfileFromService(){
    this._httpService.editProfile(this.loggedUser).subscribe((data:any) => {
      this._router.navigate(['/profile/' + this.loggedUser._id]);
    })
  }

  addInstrumentFromService(){
    this._httpService.addInstrument(this.loggedUser).subscribe((data:any)=>{
      this._router.navigate(['/profile/' + this.loggedUser._id]);
    })
  }

  removeInstrumentFromService(){
    this._httpService.removeInstrument(this.loggedUser).subscribe((data:any) => {
      this._router.navigate(['/profile/' + this.loggedUser._id]);
    })
  }

  addGenreFromService(){
    this._httpService.addGenre(this.loggedUser).subscribe((data:any) => {
      this._router.navigate(['/profile/' + this.loggedUser._id]);
    })
  }

  removeGenreFromService(){
    this._httpService.removeGenre(this.loggedUser).subscribe((data:any) => {
      this._router.navigate(['/profile/' + this.loggedUser._id]);
    })
  }

}
