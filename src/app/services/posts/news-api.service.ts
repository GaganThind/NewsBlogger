import { Injectable } from '@angular/core';
import BaseService from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UrlResolverService } from '../common/url-resolver.service';
import { NewsSouces } from 'src/app/util/news-source';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends BaseService {

  constructor(httpClient: HttpClient, private urlResolverSvc: UrlResolverService) { super(httpClient) }

  /**
   * Get the NEWS api url from json
   */
  private newsApiSvcUrl(): Observable<any> {
    const NEWS_API = NewsSouces[NewsSouces.NEWS_API];
    return this.urlResolverSvc.getServiceURL(NEWS_API);
  }

  /**
   * Fetches the news posts from the News API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPosts(): Observable<any> {
    return this.newsApiSvcUrl()
      .pipe(
        mergeMap(
          url => {
            return super.fetchNewsPosts(url);
          }
        )
      );
  }

  /**
   * Fetches the news posts based by pages from the News API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return this.newsApiSvcUrl()
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
