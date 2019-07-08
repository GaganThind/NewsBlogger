import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlResolverService } from 'src/app/services/common/url-resolver.service';
import { NewsSouces } from 'src/app/util/global-variables';

export function init_app_1(urlResolverSvc: UrlResolverService) {
  return () => urlResolverSvc.getInitServiceURL(NewsSouces[NewsSouces.THE_GUARDIAN]);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UrlResolverService,
    { provide: APP_INITIALIZER, useFactory: init_app_1, deps: [UrlResolverService], multi: true },
  ]
})
export class AppLoadModule { }
