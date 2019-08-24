import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_MAP } from 'src/app/util/global-variables';
import { BaseService } from '../common/base.service';

/**
 * Abstract news service class providing the basic methods for the child classes to implement
 */
@Injectable({
  providedIn: 'root'
})
export default abstract class AbstractNewsService {

  constructor() { }

  /**
   * Get the URL from the map created during initialization
   * 
   * @param agent : This tells the website to hit
   */
  protected getServiceURLFromInitMap(agent: string): string {
    const url = URL_MAP.get(agent);
    return typeof url == "string" && url.trim().length ? url : "";
  }

  /**
   * This method fetches the data from the provided URL.
   * The URL can be localed on the web or locally.
   * 
   * @param url : This is the url from where to fetch the data
   */
  protected fetchDataFromURL(url: string): Observable<any> {
    return (url.trim().indexOf("http://") != -1 || url.trim().indexOf("https://") != -1) ? 
            BaseService.Instance.fetchDataFromURL(url) : 
            Observable.throw("Incorrect source URL format");
  }

}
