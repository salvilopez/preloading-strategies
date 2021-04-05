import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadService {

  // SUbject que nos devuelve unas opciones de Precarga
  private subject = new Subject<OnDemandPreloadOptions>();
  // Pasamos el Subject a Observable para que se pueda consumir desde la clase de
  // onDemandStrategy
  state = this.subject.asObservable();

  constructor() { }

  // Método para iniciar la Precarga
  startPreload(routePath: string) {
    // Creamos las opciones de Precarga
    // - routePath: Ruta que queremos precargar
    // - true: el valor de preload que queremos (solo aquellas rutas que tengan preload a true)
    const opciones: OnDemandPreloadOptions = new OnDemandPreloadOptions(routePath, true);
    // Despachamos el valor de las opciones a través del next() del Subject
    this.subject.next(opciones);
  }

}

// OnDemandPreloadOptions --> routePath(ruta), preload(true/false)
// Clase que nos sirve para obtener las opciones de cada ruta
// A partir de estas opciones, se establecerá el criterio de si debe ser precargada
// o no
export class OnDemandPreloadOptions {
  constructor(public routePath: string, public preload: boolean = true) {

  }
}
