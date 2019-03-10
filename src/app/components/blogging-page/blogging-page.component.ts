import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';
import { UrlResolverService } from '../../services/posts/url-resolver.service';
import { NewYorkTimesService } from '../../services/posts/new-york-times.service';
import { NewsSouces } from '../../util/news-source';

@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit {

  private posts: Posts[] = [];
  private postsGrdn: Posts[] = [];
  private postsNY: Posts[] = [];

  constructor(private theGuardianSvc: TheGuardianService,
    private urlResolverSvc: UrlResolverService,
    private newYorkTimesSvc: NewYorkTimesService ) { }

  ngOnInit() {
    const THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    this.getNewsPosts(THE_GUARDIAN);
    this.getNewsPosts(NEW_YORK_TIMES);
  }

  private getNewsPosts(agent: string) {
    this.urlResolverSvc.getBaseURL(agent).subscribe(
      url => {
        this.urlResolverSvc.getAPIKey(agent).subscribe(
          api => {
            this.getPostsDataFromService(agent, url+api);
          }
        );
      }
    );
  }

  getPostsDataFromService(agent: string, url: string) {
    var postArr: Posts[] = [];
    if(NewsSouces.THE_GUARDIAN === NewsSouces[agent]) {
      this.theGuardianSvc.fetchNewsPosts(url).subscribe(
        data => {
          data.response.results.map(
            postObjct => postArr.push(new Posts(postObjct))
          )
        }
      );
      this.postsGrdn = postArr;
    } else if(NewsSouces.NEW_YORK_TIMES === NewsSouces[agent]) {
      this.newYorkTimesSvc.fetchNewsPosts(url).subscribe(
        data => data.results.map(
          postObjct => {
            postObjct.webTitle = postObjct.title;
            postObjct.webUrl = postObjct.url;
            postObjct.type = postObjct.item_type;
            postObjct.webPublicationDate = postObjct.published_date;
            postArr.push(new Posts(postObjct))
          }
        )
      );
      this.postsNY = postArr;
    }
  }
}