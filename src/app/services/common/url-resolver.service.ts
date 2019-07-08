import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BaseService from './base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_MAP } from 'src/app/util/global-variables';

/**
 * This class fetches the resources at the provided url
 */
@Injectable({
  providedIn: 'root'
})
export class UrlResolverService extends BaseService {

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
    return super.fetchDataFromURL(jsonLocation).pipe(
      map(
        data => data.find(obj => obj.id === key).value
      )
    );
  }

  /**
   * Retrieve all the Urls and APIs
   */
  public async getUrlWithAPIKeys() {
    const urlValues: Object[] = await super.fetchDataFromURL(this.WEB_URL_KEY_LOCATION).toPromise();
    const apiKeyValues: Object[] = await super.fetchDataFromURL(this.API_KEY_LOCATION).toPromise();
    let urlWithApiKey: string;

    urlValues.forEach((url, index) => {
      apiKeyValues.forEach((apiKey, index) => {
        if(url["id"] == apiKey["id"]) {
          urlWithApiKey = url["value"] + apiKey["value"];
          URL_MAP.set(url["id"], urlWithApiKey);
        }
      });
    });
  }

  /**
   * Load the serviceURLs during app initialization
   * 
   * @param agent : This parameter tell which news source url to hit
   */
  getInitServiceURL(agent: string): Promise<any> {
    return this.getUrlWithAPIKeys();
  }

}
