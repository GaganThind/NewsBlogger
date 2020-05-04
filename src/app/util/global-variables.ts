/**
 * This enum contains all the news sources from where data is fetched
 */
export enum NewsSouces {
    THE_GUARDIAN = 0,
    NEW_YORK_TIMES = 1,
    NEWS_API = 2
}

/**
 * This map stores the global values for corresponding to urls
 */
export let URL_MAP = new Map<string, string>();
