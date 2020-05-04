import { Observable } from 'rxjs';

/** This interface provides the default methods that any news service will need to implement */
export interface NewsService {

    /** Fetch all the posts from the website */
    fetchNewsPosts(): Observable<any>;

    /** Fetch page wise posts from website */
    fetchNewsPostsWithPage(page: number): Observable<any>;

}
