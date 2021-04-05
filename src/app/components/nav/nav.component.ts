import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OnDemandPreloadService } from 'src/app/services/on-demand-preload.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private preloadService:OnDemandPreloadService) {}

    /**
     * Metodo para precargar todas la rutas que tengan preload a true
     */
cargarTodas(){
this.preloadService.startPreload('*');


}
/**
 *
 * @param routePath Metodo para cargar una ruta
 */
cargarRutas(routePath:string){

this.preloadService.startPreload(routePath);
}
}
