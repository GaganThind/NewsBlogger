import { Injectable } from '@angular/core';
import { NewsSouces } from '../../util/global-variables';
import { TheGuardianService } from './the-guardian.service';
import { NewYorkTimesService } from './new-york-times.service';
import { NewsApiService } from './news-api.service';
import { NewsService } from './news-service';
import { InjectorInstance } from 'src/app/modules/injector.module';

/**
 * News factory class to provide the new services based on input
 */
@Injectable({
  providedIn: 'root'
})
export class NewsFactoryService {

  /** Singleton instance */
  private static instance: NewsFactoryService = null;

  private constructor(
    private theGuardianSvc: TheGuardianService,
    private newYorkSvc: NewYorkTimesService,
    private newsApiSvc: NewsApiService
  ) { }

  static get Instance(): NewsFactoryService {
    if(null === this.instance || undefined === this.instance) {
      const theGuardian =  InjectorInstance.get<TheGuardianService>(TheGuardianService);
      const newYork =  InjectorInstance.get<NewYorkTimesService>(NewYorkTimesService);
      const newsApi =  InjectorInstance.get<NewsApiService>(NewsApiService);
      this.instance = new NewsFactoryService(theGuardian, newYork, newsApi);
    }
    return this.instance;
  }

  /**
   * This factory method returns the type of service requested by the user.
   *
   * @param newsSource: News source
   */
  getService(newsSource: string): NewsService {
    switch(newsSource) {
      case NewsSouces[NewsSouces.THE_GUARDIAN]: return this.theGuardianSvc;
      case NewsSouces[NewsSouces.NEW_YORK_TIMES]: return this.newYorkSvc;
      case NewsSouces[NewsSouces.NEWS_API]: return this.newsApiSvc;
      default: return null;
    }
  }
}
