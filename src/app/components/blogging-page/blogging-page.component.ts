import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';

@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit {

  private posts: Posts[] = [];
  constructor(private theGuardianService: TheGuardianService) { }

  ngOnInit() {
    this.getPostsDataFromService();
  }

  getPostsDataFromService() {
    this.theGuardianService.fetchNewsPosts();
  }
}
