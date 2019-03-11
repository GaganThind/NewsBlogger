import { Component, OnInit, Input } from '@angular/core';
import { Posts } from '../../models/posts.model';

/**
 * This class is used to dspaly the individual posts
 */
@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  @Input() post: Posts
  constructor() { }

  ngOnInit() {
  }

}
