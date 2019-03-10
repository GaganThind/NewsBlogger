import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';
import { UrlResolverService } from '../../services/posts/url-resolver.service';

@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit {

  private posts: Posts[] = [];
  private baseURL: string;
  constructor(private theGuardianService: TheGuardianService
    , private urlResolverSvc: UrlResolverService) { }

  ngOnInit() {
    const THE_GUARDIAN = 'THE_GUARDIAN';
    let abc = this.getServiceURL(THE_GUARDIAN);
    console.log(abc);
    //this.getPostsDataFromService();
  }

  private getServiceURL(agent: string) {
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
    this.posts = this.theGuardianService.fetchNewsPosts(url);
  }
}
