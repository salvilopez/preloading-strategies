import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnDemandPreloadOptions, OnDemandPreloadService } from '../services/on-demand-preload.service';


@Injectable({
  providedIn: 'root'
})
export class OnDemand implements PreloadingStrategy {

  // Cuando nosotros hacemos referencia a un Observable, se hace uso del caracter
  // $ que indica que no es un valor actual, sino futuro
  private preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  // Inyectamos el Servicio en el constructor
  constructor(private onDemandPreloadService: OnDemandPreloadService) {
    // Nos vamos a traer el SUBJECT del Servicio
    // Nos va a tener informados del valor que se emita con las opciones
    // Lo que queremos es el "state" del Servicio
    this.preloadOnDemand$ = this.onDemandPreloadService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    // Antes de devolver nada, vamos a realizar verificaciones
    // Vamos a iterar por los siguientes valores que nos devuelva el Subject STATE del Service
    return this.preloadOnDemand$.pipe(
      mergeMap(
        preloadOptions => {
          // Verificamos que la ruta deba ser precargada (true o false)
          const deberiaPrecargar = this._preloadCheck(route, preloadOptions);

          // Mostramos por consola si se precarga o no la ruta
          console.log(`${deberiaPrecargar ? '' : 'NO' } Precarga la ruta: ${route.path}`)

          // Si debe precargar, se ejecuta el callback load() y si no, nada EMPTY
          return deberiaPrecargar ? load() : EMPTY
        }
      )
    )
  }

  /**
   * _preloadCheck: Método que sirve para comprobar si se debe o no
   * precargar una ruta
   * @param route Ruta a evaluar
   * @param preloadOptions Opciones de la ruta a evaluar
   */
  private _preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {

    // Return true si se dan todas las condiciones --> Precarga la ruta
    // False si alguna no está --> No Precarga la ruta
    return (
      route.data && // Comprobar que la ruta tenga data
      route.data['preload'] && // Comprobar que la ruta tenga preload a true dentro de data
      [route.path, '*'].includes(preloadOptions.routePath) && // Comprobar que es una ruta existente
      preloadOptions.preload // Que dentro del las opciones de precarga venga preload a true
    );
  }

}
