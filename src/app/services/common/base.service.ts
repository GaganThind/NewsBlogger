import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This class is the base for all services classes with common methods.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private serviceArgURL: string;
  private serviceArgKey: string;

  constructor(private httpClient: HttpClient) { }

  protected fetchDataFromURL(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  protected fetchNewsPosts(url: string): Observable<any> {
    return this.fetchDataFromURL(url);
  }

}
