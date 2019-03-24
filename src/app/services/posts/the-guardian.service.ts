import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BaseService from '../common/base.service';
import { Observable } from 'rxjs';
import { UrlResolverService } from '../common/url-resolver.service';
import { mergeMap } from 'rxjs/operators';
import { NewsSouces } from 'src/app/util/news-source';

/**
 * This service class is used for The Guardian News service
 */
@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends BaseService {

  constructor(httpClient: HttpClient, private urlResolverSvc: UrlResolverService) { super(httpClient) }

  /**
   * Get the Guardian url from json
   */
  private guardianSvcUrl(): Observable<any> {
    const THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
    return this.urlResolverSvc.getServiceURL(THE_GUARDIAN);
  }

  /**
  * Fetches the news posts from the The Guardian API service.
  * This method return an Observable which can hen be subscribed.
  * 
  * @param url : Specify the url to fetch the data
  */
  fetchNewsPosts(): Observable<any> {
    return this.guardianSvcUrl()
      .pipe(
        mergeMap(
          url => {
            return super.fetchNewsPosts(url);
          }
        )
      );
  }

  /**
   * Fetches the news posts based by pages from the The Guardian API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return this.guardianSvcUrl()
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