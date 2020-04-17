import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InjectorInstance } from 'src/app/modules/injector.module';

/**
 * This class has common methods to fetch data.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private static instance: BaseService = null;

  private constructor(private httpClient: HttpClient) { }

  /**
   * Singelton instance for the service
   */
  static get Instance() {
    if(null === this.instance || undefined === this.instance) {
      const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);
      this.instance = new BaseService(httpClient);
    }
    return this.instance;
  }

  /**
   * Fetch data from provided url
   * 
   * @param url 
   */
  public fetchDataFromURL(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  /**
   * Retrieve the value from desired file by sending the key
   * 
   * @param jsonLocation : This parameter is the local json/other file location to retrieve data from
   * @param key : This is the key whose value is to be returned
   */
  public getValueFromJSON(jsonLocation: string, key: string): Observable<any> {
    return this.fetchDataFromURL(jsonLocation).pipe(
      map(
        data => data.find(obj => obj.id === key).value
      )
    );
  }

}
