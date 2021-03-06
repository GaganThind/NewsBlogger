import { Component, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NewsFactoryService } from 'src/app/services/posts/news-factory.service';
import { NewsSouces } from 'src/app/util/global-variables';

/**
 * This class is the page component renderer which contains methods to fetch news posts
 * and then pass it to the view layer
 */
@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, OnDestroy {

  private posts: Posts[] = [];
  private ngUnsubscribe = new Subject();

  //Scroll variables DO NOT remove
  private throttle = 300;
  private scrollDistance = 1;
  private scrollUpDistance = 2;
  private page: number = 1;

  //News Sources
  FETCH_FRM_THE_GUARDIAN: boolean = true;
  FETCH_FRM_NEW_YORK_TIMES: boolean = true;
  FETCH_FRM_NEWS_API: boolean = true;

  //News Factory instance
  private newsFactory = NewsFactoryService.Instance;

  constructor() { }

  ngOnInit() {
    this.getNewsPosts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onInfiniteDownScroll() {
    this.page += 1;
    this.getNewsPosts();
  }

  //This method gets the news posts and creates an array of Posts objects that are displayed on screen
  private getNewsPosts() {
    var postArr: Posts[] = this.posts;
    
    if (this.FETCH_FRM_THE_GUARDIAN) {
      const guardianNewsSvc = this.newsFactory.getService(NewsSouces[NewsSouces.THE_GUARDIAN]);
      guardianNewsSvc.fetchNewsPostsWithPage(this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
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
    }

    if (this.FETCH_FRM_NEW_YORK_TIMES) {
      const newYorkTimesNewsSvc = this.newsFactory.getService(NewsSouces[NewsSouces.NEW_YORK_TIMES]);
      newYorkTimesNewsSvc.fetchNewsPostsWithPage(this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
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
    }

    if (this.FETCH_FRM_NEWS_API) {
      const newsAPINewsSvc = this.newsFactory.getService(NewsSouces[NewsSouces.NEWS_API]);
      newsAPINewsSvc.fetchNewsPostsWithPage(this.page)
        .pipe(
          takeUntil(this.ngUnsubscribe)
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