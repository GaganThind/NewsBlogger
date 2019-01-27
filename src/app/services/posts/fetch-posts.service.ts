import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../models/posts.model';
import { Observable } from 'rxjs';
import { ApiKeys } from '../../models/api-keys.model';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  private THE_GUARDIAN_URL = 'https://content.guardianapis.com/search?api-key=';
  private NEW_YORK_TIMES_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
  private API_KEY_LOCATION = './assets/api-keys.json';

  private THE_GUARDIAN_KEY: string = "0d2d055e-f203-4abb-9090-d662fa2f82f2";
  private NEW_YORK_TIMES_KEY: string = "2e1e2c72a41d4e029512537c6406cf18";

  private posts: Posts[] = [];
  private jsonKeyArr: ApiKeys[] = [];

  constructor(private httpClient: HttpClient) { }

  fetchNewsPosts() {
    this.jsonKeyArr = this.getKeysFromJSON(this.API_KEY_LOCATION);
    this.posts = this.createModelObjForGuardian(this.THE_GUARDIAN_URL + this.THE_GUARDIAN_KEY);
    this.posts = this.createModelObjForNewYork(this.NEW_YORK_TIMES_URL + this.NEW_YORK_TIMES_KEY
      , this.posts);
    return this.posts;
  }

  private fetchDataFromURL(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  private createModelObjForGuardian(url: string): Posts[] {
    var postArr: Posts[] = [];
    var observble = this.fetchDataFromURL(url);
    observble.subscribe(
      data => {
        data.response.results.map(
          postObjct => postArr.push(new Posts(postObjct))
        )
      }
    );
    return postArr;
  }

  private createModelObjForNewYork(url: string, postArr: Posts[]): Posts[] {
    var observble = this.fetchDataFromURL(url);
    observble.subscribe(
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
    return postArr;
  }

  private getKeysFromJSON(url: string): ApiKeys[] {
    var jsonKeys: ApiKeys[] = [];
    this.fetchDataFromURL(url).subscribe(data => {
      data.map(
        api => jsonKeys.push(new ApiKeys(api))
      );
    });
    return jsonKeys;
  }
}
