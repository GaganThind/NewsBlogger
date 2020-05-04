import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';
import AbstractNewsService from './abstract-news.service';
import { NewsService } from './news-service';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends AbstractNewsService implements NewsService {

  private serviceUrl: string = null;

  constructor() {
    super();
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
    return super.fetchDataFromURL(this.serviceUrl);
  }

  /**
   * Fetches the news posts based by pages from the News API service.
   * This method return an Observable which can hen be subscribed.
   *
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchDataFromURL(this.serviceUrl + '&page=' + page);
  }

}
