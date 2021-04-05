import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrecargaOpcional } from './strategies/precarga-opcional.strategy';

const routes: Routes = [

{
  path:'',
  pathMatch:'full',
  redirectTo:'/home'
},
{
  path:'home',
  loadChildren:()=>import('./modules/home/home.module').then(m =>m.HomeModule),
  data:{
    preload:true
  }
},
{
  path:'users',
  loadChildren:()=>import('./modules/users/users.module').then(m =>m.UsersModule),
  data:{
    preload:true
  }
},
{
  path:'market',
  loadChildren:()=>import('./modules/market/market.module').then(m =>m.MarketModule),
  data:{
    preload:false
  }
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      //1recarga todos los modulos, ya no sera carga perezosa
      //preloadingStrategy:PreloadAllModules
      //2 precarga condicional a partir de "preload a treue en las rutas"
         preloadingStrategy:PrecargaOpcional
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
