import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BloggingPageComponent } from './components/blogging-page/blogging-page.component';

const routes: Routes = [
  {path:'', component:BloggingPageComponent},
  {path:'aboutUs', component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
