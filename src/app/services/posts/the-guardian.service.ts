import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BaseService from '../common/base.service';
import { Observable } from 'rxjs';
import { NewsSouces } from 'src/app/util/global-variables';

/**
 * This service class is used for The Guardian News service
 */
@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends BaseService {

  private serviceUrl: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    const THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
    this.serviceUrl = super.getServiceURLFromInitMap(THE_GUARDIAN);
  }

  /**
  * Fetches the news posts from the The Guardian API service.
  * This method return an Observable which can hen be subscribed.
  * 
  * @param url : Specify the url to fetch the data
  */
  fetchNewsPosts(): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl);
  }

  /**
   * Fetches the news posts based by pages from the The Guardian API service.
   * This method return an Observable which can hen be subscribed.
   * 
   * @param url : Specify the url to fetch the data
   */
  fetchNewsPostsWithPage(page: number): Observable<any> {
    return super.fetchNewsPosts(this.serviceUrl + '&page=' + page);
  }

}