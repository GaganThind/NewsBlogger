import { Component, OnInit } from '@angular/core';
import { FetchPostsService } from '../../services/posts/fetch-posts.service';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit {

  private posts: Posts[] = [];
  constructor(private postService: FetchPostsService) { }

  ngOnInit() {
    this.getPostsDataFromService();
  }

  getPostsDataFromService() {
    this.posts = this.postService.fetchNewsPosts();
  }
}
