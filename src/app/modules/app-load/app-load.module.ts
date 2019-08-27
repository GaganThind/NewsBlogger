import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlResolverService } from 'src/app/services/common/url-resolver.service';
import { BaseService } from 'src/app/services/common/base.service';

/** Initialize the base services */
export function init_app_1() {
  return () => BaseService.Instance;
}

/** Load the url and API keys */
export function init_app_2(urlResolverSvc: UrlResolverService) {
  return () => urlResolverSvc.getInitServiceURL();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UrlResolverService,
    { provide: APP_INITIALIZER, useFactory: init_app_1, multi: true },
    { provide: APP_INITIALIZER, useFactory: init_app_2, deps: [UrlResolverService], multi: true }
  ]
})
export class AppLoadModule { }
