import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PaintingPageComponent } from './components/painting-page/painting-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch:'full' },
  { path: 'gallery', component: GalleryComponent},
  { path: 'gallery/:id', component: PaintingPageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  { path: 'users/:id', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
