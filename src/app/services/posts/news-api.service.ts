import { Injectable } from '@angular/core';
import BaseService from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends BaseService {

  private serviceUrl: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    const NEWS_API = NewsSouces[NewsSouces.NEWS_API];
    this.serviceUrl = super.getServiceURLFromInitMap(NEWS_API);
  }

  /**
   * Fetches the news posts from the News API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPosts(): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl);
  }

  /**
   * Fetches the news posts based by pages from the News API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl + '&page=' + page);
  }

}
