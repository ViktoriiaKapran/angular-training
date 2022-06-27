import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalInfoComponent} from './components/personal-info/personal-info.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConvertAmountToStr } from './pipes/convert-amount-to-str.pipe';
import { DropdownDirective } from './directives/dropdown.directive';
import { HeaderComponent } from './components/header/header.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialExampleModule} from './material.module';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PaintingService } from './services/painting.service';
import { PaintingCardComponent } from './components/painting-card/painting-card.component';
import { PaintingPageComponent } from './components/painting-page/painting-page.component';
import { UserService } from './services/user.service';
import { RangeComponent } from './components/range/range.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './components/users/users.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AdminGuard } from './guards/admin-guard';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    // PersonalInfoDialog,
    ProductsComponent,
    ProductCardComponent,
    ConvertAmountToStr,
    DropdownDirective,
    HeaderComponent,
    ProductPageComponent,
    GalleryComponent,
    PaintingCardComponent,
    PaintingPageComponent,
    RangeComponent,
    RegistrationComponent,
    LoginComponent,
    UsersComponent,
    DeleteConfirmationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,

  ],
  providers: [PaintingService, UserService, CookieService, 
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
