import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsPostComponent } from './components/news-post/news-post.component';
import { UrlResolverService } from './services/common/url-resolver.service';
import { CustomErrorHandlerService } from './services/common/custom-error-handler.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppLoadModule } from '././modules/app-load/app-load.module';
import { InjectorModule } from './modules/injector.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutUsComponent,
    NewsPageComponent,
    NewsPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppLoadModule,
    InjectorModule
  ],
  providers: [
    UrlResolverService,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
