import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends BaseService {

  constructor(httpClient: HttpClient) { super(httpClient) }

  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }
}
