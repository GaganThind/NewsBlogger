import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';
import AbstractNewsService from './abstract-news.service';
import { NewsService } from './news-service';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends AbstractNewsService implements NewsService {
  
  private NEWS_API = NewsSouces[NewsSouces.NEWS_API];
  private serviceUrl: string = super.getServiceURLFromInitMap(this.NEWS_API);

  /**
   * Singleton instance
   */
  private static instance: NewsApiService = null;

  private constructor() { super() }

  static get Instance() {
    if(null === this.instance || undefined === this.instance) {
      this.instance = new NewsApiService();
      console.log("News API Service");
    }
    return this.instance;
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
