import { Injectable } from '@angular/core';
import BaseService from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';

/**
 * This service class is used for New York Times News service
 */
@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends BaseService {

  private serviceUrl: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    this.serviceUrl = super.getServiceURLFromInitMap(NEW_YORK_TIMES);
  }

  /**
   * Fetches the news posts from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPosts(): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl);
  }

  /**
   * Fetches the news posts based on page from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl + '&page=' + page);
  }

}
