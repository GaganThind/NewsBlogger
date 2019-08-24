import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';
import AbstractNewsService from './abstract-news.service';
import { NewsService } from './news-service';

/**
 * This service class is used for New York Times News service
 */
@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends AbstractNewsService implements NewsService {

  private serviceUrl: string = null;
  
  /**
   * Singelton instance
   */
  private static instance: NewYorkTimesService = null;

  private constructor() { 
    super(); 
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    this.serviceUrl = super.getServiceURLFromInitMap(NEW_YORK_TIMES);
  }

  static get Instance() {
    if(null === this.instance || undefined === this.instance) {
      this.instance = new NewYorkTimesService();
    }
    return this.instance;
  }

  /**
   * Fetches the news posts from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPosts(): Observable<any> {
    return super.fetchDataFromURL(this.serviceUrl);
  }

  /**
   * Fetches the news posts based on page from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchDataFromURL(this.serviceUrl + '&page=' + page);
  }

}
