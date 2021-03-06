import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitProfileComponent } from './visit-profile/visit-profile.component';


const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user/:id', component: VisitProfileComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile/:id/welcome', component: ProfileWelcomeComponent},
  {path: 'profile/:id/edit', component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
