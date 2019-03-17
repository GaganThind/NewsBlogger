import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

/**
 * This class fetches the resources at the provided url
 */
@Injectable({
  providedIn: 'root'
})
export class UrlResolverService extends BaseService{

  private WEB_URL_KEY_LOCATION = './assets/web-posts-url.json';
  private API_KEY_LOCATION = './assets/api-keys.json';

  constructor(httpClient: HttpClient) { super(httpClient) }

  /**
   * Retrieve the value from desired file by sending the key
   * 
   * @param jsonLocation : This parameter is the local json/other file location to retrieve data from
   * @param key : This is the key whose value is to be returned
   */
  private getValueFromJSON(jsonLocation: string, key: string): Observable<any> {
    return this.fetchDataFromURL(jsonLocation).pipe(
      map(
         data => data.find(obj => obj.id === key).value
      )
    );
  }

  /**
   * Retrieve the news source url
   * 
   * @param key : This parameter tell which news source url to get
   */
  private getBaseURL(key: string): Observable<any> {
    return this.getValueFromJSON(this.WEB_URL_KEY_LOCATION, key);
  }

  /**
   * Retrieve the api key from the api-keys.json
   * 
   * @param key : This parameter tell which news source api key to get
   */
  private getAPIKey(key: string): Observable<any> {
    return this.getValueFromJSON(this.API_KEY_LOCATION, key);
  }

  /**
   * This method return an Observable for the specified news agent
   * 
   * @param agent : This parameter tell which news source url to hit
   */
  public getServiceURL(agent: string): Observable<any> {
    const obsrvblBaseURL = this.getBaseURL(agent);
    const obsrvblAPIKey = this.getAPIKey(agent);

    return obsrvblBaseURL.pipe(
      mergeMap(
        url => {
          return obsrvblAPIKey.pipe(
            map(api => url + api)
          );
        }
      )
    )
  }
}
