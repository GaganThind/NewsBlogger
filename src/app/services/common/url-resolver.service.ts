import { Injectable } from '@angular/core';
import { URL_MAP } from 'src/app/util/global-variables';
import { BaseService } from './base.service';

/**
 * This class fetches the resources at the provided url
 */
@Injectable({
  providedIn: 'root'
})
export class UrlResolverService {

  private WEB_URL_KEY_LOCATION = './assets/web-posts-url.json';
  private API_KEY_LOCATION = './assets/api-keys.json';

  constructor() { }

  /**
   * Retrieve all the Urls and APIs
   */
  public async getInitServiceURL(): Promise<any> {
    const urlValues: Object[] = await BaseService.Instance.
                    fetchDataFromURL(this.WEB_URL_KEY_LOCATION).toPromise();
    const apiKeyValues: Object[] = await BaseService.Instance.
                    fetchDataFromURL(this.API_KEY_LOCATION).toPromise();

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

    if(0 === countOfUrlsWithKeys || 0 === countOfUrls) {
      return Promise.reject("No News source defined. Contact Admin");
    } 
    return Promise.resolve();
  }

}
