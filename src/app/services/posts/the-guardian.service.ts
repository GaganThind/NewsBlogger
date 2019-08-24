import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';
import AbstractNewsService from './abstract-news.service';
import { NewsService } from './news-service';

/**
 * This service class is used for The Guardian News service
 */
@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends AbstractNewsService implements NewsService {

  private THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
  private serviceUrl: string = super.getServiceURLFromInitMap(this.THE_GUARDIAN);

  /**
   * Singleton instance
   */
  private static instance: TheGuardianService = null;

  private constructor() { super(); }

  static get Instance() {
    if(null === this.instance || undefined === this.instance) {
      this.instance = new TheGuardianService();
      console.log("Guardian Service");
    }
    return this.instance;
  }

  /**
  * Fetches the news posts from the The Guardian API service.
  * This method return an Observable which can hen be subscribed.
  * 
  * @param url : Specify the url to fetch the data
  */
  fetchNewsPosts(): Observable<any> {
    return super.fetchDataFromURL(this.serviceUrl);
  }

  /**
   * Fetches the news posts based by pages from the The Guardian API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchDataFromURL(this.serviceUrl + '&page=' + page);
  }

}