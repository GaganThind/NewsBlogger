import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts.model';
import { CommonServicesService } from './common-services.service';


@Injectable({
  providedIn: 'root'
})
export class TheGuardianService extends CommonServicesService{

  private posts: Posts[] = [];
  
  constructor(httpClient: HttpClient) { super(httpClient) }

  fetchNewsPosts(url: string) {
    this.posts = this.createModelObjForGuardian(url);
    return this.posts;
  }

  private createModelObjForGuardian(url: string): Posts[] {
    var postArr: Posts[] = [];
    this.fetchDataFromURL(url).subscribe(
      data => {
        data.response.results.map(
          postObjct => postArr.push(new Posts(postObjct))
        )
      }
    );
    return postArr;
  }

}