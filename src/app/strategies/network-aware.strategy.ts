import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

// avoid typing issues for now
export declare var navigator:any;

@Injectable({ providedIn: 'root' })
export class NetworkAware implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection(): boolean {
    //obtenemos la conexion del usuario
    const conn = navigator.connection;
    if (conn) {

      //savedata es una modalidad para el ahorro de edatos en dispositivos moviles por lo que el usuario tiene la opcion de
      //Save data en su movil , no precargamos nada y así ahorrar datos del usuario
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];

      //aqui se obtiene la conexiond el usuario y se mira si esta en la lista negra de las de arriba
      const effectiveType = conn.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        //si esta dentro no se precarga
        return false;
      }
    }
    return true;
  }
}
