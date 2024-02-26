import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

// const DB_ENDPOINT: string = "https://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor() { }

  /**
   * Funzione per la costruzione dell'endpoint per le chiamate alla API di The Movie DB
   * @param endpoint risorsa a cui accedere
   * @param additionalQueryParam eventuali parametri specificati nella documentazione https://www.themoviedb.org/3
   * @returns stringa costruita pronta per essere utilizzata come parametro di una chiamata HttpClient
   */
  buildApiRequest(endpoint: string, additionalQueryParam?: string){
    return `${environment.API_URI}/${endpoint}${environment.REQ_AUTH}${additionalQueryParam}`;
  }

  /**
   * Funzione per la costruzione dell'endpoint per le chiamate locali
   * @param endpoint risorsa a cui accedere
   * @param id eventuale parametro per operazioni CRUD
   * @returns stringa costruita pronta per essere utilizzata come parametro di una chiamata HttpClient
   */
  // buildLocalDbRequest(endpoint: string, id?: number){
  //   return `${DB_ENDPOINT}/${endpoint}${id ? "/" + id : ''}`
  // }
}
