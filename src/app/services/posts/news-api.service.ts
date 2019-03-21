import { Injectable } from '@angular/core';
import BaseService from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient) }

  /**
   * Fetches the news posts from the The Guardian API service.
   * This method return an Observable which can hen be subscribed.
   * @param url 
   */
  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }
  
}
