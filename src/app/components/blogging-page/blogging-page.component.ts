import { Component, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';
import { UrlResolverService } from '../../services/common/url-resolver.service';
import { NewYorkTimesService } from '../../services/posts/new-york-times.service';
import { NewsSouces } from '../../util/news-source';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NewsApiService } from 'src/app/services/posts/news-api.service';

/**
 * This class is the page component renderer which contains methods to fetch news posts
 * and then pass it to the view layer
 */
@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit, OnDestroy {
  
  private posts: Posts[] = [];
  private ngUnsubscribe = new Subject();

  constructor( 
    private urlResolverSvc: UrlResolverService,
    private theGuardianSvc: TheGuardianService,
    private newYorkTimesSvc: NewYorkTimesService,
    private newsAPISvc: NewsApiService 
  ) { }

  ngOnInit() {
    const THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    const NEWS_API = NewsSouces[NewsSouces.NEWS_API];
    this.getNewsPosts(THE_GUARDIAN);
    //this.getNewsPosts(NEW_YORK_TIMES);
    //this.getNewsPosts(NEWS_API);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  //This method gets the news posts and creates an array of Posts objects that are displayed on screen
  private getNewsPosts(agent: string) {
    var postArr: Posts[] = this.posts;
    const newsServiceurl = this.urlResolverSvc
                                  .getServiceURL(agent)
                                  .pipe(
                                    takeUntil(this.ngUnsubscribe)
                                  );

    if(NewsSouces.THE_GUARDIAN === NewsSouces[agent]) {
      newsServiceurl.pipe(
        mergeMap(url => this.theGuardianSvc.fetchNewsPosts(url))
      ).subscribe(
        data => {
          data.response.results.map(
            postObjct => {
              postObjct.title = postObjct.webTitle;
              postObjct.url = postObjct.webUrl;
              postObjct.typeOfPostOrSource = postObjct.type;
              postObjct.date = postObjct.webPublicationDate;
              postArr.push(new Posts(postObjct))
            }
          )
        }
      );
    } else if(NewsSouces.NEW_YORK_TIMES === NewsSouces[agent]) {
      newsServiceurl.pipe(
        mergeMap(url => this.newYorkTimesSvc.fetchNewsPosts(url)
        )
      ).subscribe(
        data => data.results.map(
          postObjct => {
            postObjct.title = postObjct.title;
            postObjct.url = postObjct.url;
            postObjct.typeOfPostOrSource = postObjct.item_type;
            postObjct.date = postObjct.published_date;
            postArr.push(new Posts(postObjct))
          }
        )
      );
    } else if(NewsSouces.NEWS_API === NewsSouces[agent]) {
      newsServiceurl.pipe(
        mergeMap(url => this.newsAPISvc.fetchNewsPosts(url)
        )
      ).subscribe(
        data => data.articles.map(
          postObjct => {
            postObjct.title = postObjct.title;
            postObjct.url = postObjct.url;
            postObjct.typeOfPostOrSource = postObjct.source.name;
            postObjct.date = postObjct.publishedAt;
            postArr.push(new Posts(postObjct))
          }
        )
      );
    }
    this.posts = postArr;
  }
}