import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {

    if(error instanceof HttpErrorResponse) {
      if(!navigator.onLine) {
        //Create and return Notification service for no internet connection to the user as popup notification

      }
      
      const errorStatus = error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      //Log the HTTP server error response

      //Create and return Notification service for the error to the user as popup notification
      
    } else {
      //Client error occured, log the error and redirect to the error page
      
    }
    console.error(error);
  }
}
