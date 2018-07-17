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
  instrumentRepository = ["Bass", "Drums", "Guitar", "Keyboard", "Vocals"];
  instruments = [];
  genreRepository = ["Blues", "Funk", "Jazz", "Rock", "Ska"];
  genres = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getUser(params.id).subscribe(data => {
        this.loggedUser = data;
        for (var i=0; i<this.instrumentRepository.length; i++){
          if (!this.loggedUser.instruments.includes(this.instrumentRepository[i])){
            this.instruments.push(this.instrumentRepository[i]);
          }
        }
        for (var i=0; i<this.genreRepository.length; i++){
          if (!this.loggedUser.genres.includes(this.genreRepository[i])){
            this.genres.push(this.genreRepository[i]);
          }
        }
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
      this.instruments = [];
      this.ngOnInit();
    })
  }

  addGenreFromService(){
    this._httpService.addGenre(this.loggedUser).subscribe((data:any) => {
      this.genres = [];
      this.ngOnInit();
    })
  }

  removeInstrumentFromService(instrument){
    this._httpService.removeInstrument(instrument, this.loggedUser._id).subscribe((data: any) => {
      this.instruments = [];
      this.ngOnInit();
    })
  }

  removeGenreFromService(genre){
    this._httpService.removeGenre(genre, this.loggedUser._id).subscribe((data: any) => {
      this.genres = [];
      this.ngOnInit();
    })
  }

}
