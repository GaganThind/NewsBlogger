import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This service class is used for New York Times News service
 */
@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient) }

  /**
   * Fetches the news posts from the New York times API service.
   * This method return an Observable which can hen be subscribed.
   * @param url 
   */
  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }
}
