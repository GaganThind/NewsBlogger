import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import BaseService from '../common/base.service';
import { Observable } from 'rxjs';

/**
 * This service class is used for The Guardian News service
 */
@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends BaseService{

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