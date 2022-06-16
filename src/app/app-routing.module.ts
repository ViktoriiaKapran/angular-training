import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PaintingPageComponent } from './components/painting-page/painting-page.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch:'full' },
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductPageComponent},
  { path: 'personal-info', component: PersonalInfoComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'gallery/:id', component: PaintingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
