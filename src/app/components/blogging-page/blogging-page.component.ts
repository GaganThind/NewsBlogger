import { Component, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';
import { NewYorkTimesService } from '../../services/posts/new-york-times.service';
import { takeUntil } from 'rxjs/operators';
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

  //Scroll variables DO NOT remove
  private throttle = 300;
  private scrollDistance = 1;
  private scrollUpDistance = 2;
  private page: number = 1;

  //News Sources
  FETCH_FRM_THE_GUARDIAN: boolean = true;
  FETCH_FRM_NEW_YORK_TIMES: boolean = false;
  FETCH_FRM_NEWS_API: boolean = false;

  constructor(
    private theGuardianSvc: TheGuardianService,
    private newYorkTimesSvc: NewYorkTimesService,
    private newsAPISvc: NewsApiService
  ) { }

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
      this.theGuardianSvc.fetchNewsPostsWithPage(this.page)
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
      this.newYorkTimesSvc.fetchNewsPostsWithPage(this.page)
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
      this.newsAPISvc.fetchNewsPostsWithPage(this.page)
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