import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../common/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends BaseService{

  constructor(httpClient: HttpClient) { super(httpClient) }

  fetchNewsPosts(url: string): Observable<any> {
    return super.fetchNewsPosts(url);
  }

}