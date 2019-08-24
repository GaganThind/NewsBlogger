import { Injectable } from '@angular/core';
import { NewsSouces } from '../../util/global-variables';
import { TheGuardianService } from './the-guardian.service';
import { NewYorkTimesService } from './new-york-times.service';
import { NewsApiService } from './news-api.service';
import { NewsService } from './news-service';

/**
 * News factory class to provide the new services based on input
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class NewsFactoryService {

  constructor() { }

  /**
   * This factory method returns the type of service requested by the user.
   * 
   * @param newsSource 
   */
  getService(newsSource: string): NewsService {
    switch(newsSource) {
      case NewsSouces[NewsSouces.THE_GUARDIAN]: return TheGuardianService.Instance;
      case NewsSouces[NewsSouces.NEW_YORK_TIMES]: return NewYorkTimesService.Instance;
      case NewsSouces[NewsSouces.NEWS_API]: return NewsApiService.Instance;
      default: return null;
    } 
  }
  
}
