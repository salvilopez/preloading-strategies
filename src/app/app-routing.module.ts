import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NetworkAware } from './strategies/network-aware.strategy';
import { OnDemand } from './strategies/on-demand.strategy';
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
       ///  preloadingStrategy:PrecargaOpcional
       //3precarga basasa en conexion
       //preloadingStrategy:NetworkAware
       //4 precarga bajo demanda: El usuario pulsara un boton o cualquier otro eventopara precargar una pagina
       preloadingStrategy:OnDemand
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
