import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BloggingPageComponent } from './components/blogging-page/blogging-page.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { TheGuardianService } from './services/posts/the-guardian.service';
import { UrlResolverService } from './services/common/url-resolver.service';
import { NewYorkTimesService } from './services/posts/new-york-times.service';
import { CustomErrorHandlerService } from './services/common/custom-error-handler.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppLoadModule } from '././modules/app-load/app-load.module'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutUsComponent,
    BloggingPageComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppLoadModule
  ],
  providers: [
    TheGuardianService,
    UrlResolverService,
    NewYorkTimesService,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
