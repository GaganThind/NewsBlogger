import { Injectable } from '@angular/core';
import { CommonServicesService } from './common-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewYorkTimesService extends CommonServicesService {

  constructor(httpClient: HttpClient) { super(httpClient) }

  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }
}
