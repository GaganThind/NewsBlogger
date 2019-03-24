import { Injectable } from '@angular/core';
import BaseService from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/news-source';
import { mergeMap } from 'rxjs/operators';
import { UrlResolverService } from '../common/url-resolver.service';

/**
 * This service class is used for New York Times News service
 */
@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends BaseService {

  constructor(httpClient: HttpClient, private urlResolverSvc: UrlResolverService) { super(httpClient) }

  /**
   * Get the New Yoork Times url from json
   */
  private newYorkTimesSvcUrl(): Observable<any> {
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    return this.urlResolverSvc.getServiceURL(NEW_YORK_TIMES);
  }

  /**
   * Fetches the news posts from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPosts(): Observable<any> {
    return this.newYorkTimesSvcUrl()
      .pipe(
        mergeMap(
          url => {
            return super.fetchNewsPosts(url);
          }
        )
      );
  }

  /**
   * Fetches the news posts based on page from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return this.newYorkTimesSvcUrl()
      .pipe(
        mergeMap(
          url => {
            url += '&page=' + page;
            return super.fetchNewsPosts(url);
          }
        )
      );
  }

}
