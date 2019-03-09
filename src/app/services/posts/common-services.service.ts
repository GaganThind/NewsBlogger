import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  private serviceArgURL: string;
  private serviceArgKey: string;

  constructor(private httpClient: HttpClient) { }

  protected fetchDataFromURL(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

}
