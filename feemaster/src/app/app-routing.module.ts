import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'infromation', loadChildren: './infromation/infromation.module#InfromationPageModule' },
  { path: 'registraion', loadChildren: './registraion/registraion.module#RegistraionPageModule' },
  { path: 'feemaster', loadChildren: './feemaster/feemaster.module#FeemasterPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'show', loadChildren: './show/show.module#ShowPageModule' },
  { path: 'show-fee', loadChildren: './show-fee/show-fee.module#ShowFeePageModule' },
  { path: 'show-infromation/:name', loadChildren: './show-infromation/show-infromation.module#ShowInfromationPageModule' },
  { path: 'student-update/:name', loadChildren: './student-update/student-update.module#StudentUpdatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
