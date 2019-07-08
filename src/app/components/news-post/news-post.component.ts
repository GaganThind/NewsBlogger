import { Component, OnInit, Input } from '@angular/core';
import { Posts } from '../../models/posts.model';

/**
 * This class is used to dspaly the individual posts
 */
@Component({
  selector: 'news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss']
})
export class NewsPostComponent implements OnInit {

  @Input() post: Posts
  constructor() { }

  ngOnInit() {
  }

}
