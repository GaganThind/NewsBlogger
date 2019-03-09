import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlResolverService } from './url-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class TheGuardianService {

  private THE_GUARDIAN_SERVICE_URL: string;

  constructor(private urlResolverSvc: UrlResolverService) { }

  fetchNewsPosts() {
    const THE_GUARDIAN = 'THE_GUARDIAN';
    this.THE_GUARDIAN_SERVICE_URL = this.getServiceURL(THE_GUARDIAN);
  }

  private getServiceURL(agent: string): string {
    let baseUrl = this.urlResolverSvc.getBaseURL(agent);
    let apiKey = this.urlResolverSvc.getAPIKey(agent);
    console.log(baseUrl);
    return baseUrl + apiKey;
  }

}
