import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from "angular2-materialize";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { } from '@types/googlemaps'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitProfileComponent } from './visit-profile/visit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    EditProfileComponent,
    ProfileWelcomeComponent,
    ProfileComponent,
    VisitProfileComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MaterializeModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
