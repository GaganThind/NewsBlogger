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
  public async getInitServiceURL(): Promise<any> {
    const urlValues: Object[] = await super.fetchDataFromURL(this.WEB_URL_KEY_LOCATION).toPromise();
    const apiKeyValues: Object[] = await super.fetchDataFromURL(this.API_KEY_LOCATION).toPromise();

    let apiKeyMap = new Map<string, string>();
    let urlWithApiKey: string;
    let apiKey: string;
    let countOfUrls: number = 0;
    let countOfUrlsWithKeys: number = 0;
    

    apiKeyValues.forEach((apiKey, index) => {
      apiKeyMap.set(apiKey["id"], apiKey["value"]);
    });

    //Add apiKeys to there respective URLs and save those in a global map
    //If an apiKey is not found then throw an error and if no api keys exists then reject the promise
    urlValues.forEach((url, index) => {
      apiKey = apiKeyMap.get(url["id"]);
      countOfUrls++;
      if(typeof apiKey == "string" && apiKey.trim().length) {
        urlWithApiKey = url["value"] + apiKey;
        URL_MAP.set(url["id"], urlWithApiKey);
        countOfUrlsWithKeys++;
      } 
    });

    if(countOfUrlsWithKeys === 0 || countOfUrls === 0) {
      return Promise.reject("No News source defined. Contact Admin");
    } 
    return Promise.resolve();
  }

}
