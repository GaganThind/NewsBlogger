import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from './common-services.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlResolverService extends CommonServicesService{

  private WEB_URL_KEY_LOCATION = './assets/web-posts-url.json';
  private API_KEY_LOCATION = './assets/api-keys.json';

  constructor(httpClient: HttpClient) { super(httpClient) }

  private getValueFromJSON(jsonLocation: string, key: string): Observable<any> {
    return this.fetchDataFromURL(jsonLocation)
    .pipe(
      map(
        data => data.find(obj => obj.id === key).value
        )
      );
  }

  public getBaseURL(key: string): Observable<any> {
    return this.getValueFromJSON(this.WEB_URL_KEY_LOCATION, key);
  }

  public getAPIKey(key: string): Observable<any> {
    return this.getValueFromJSON(this.API_KEY_LOCATION, key);
  }
}
