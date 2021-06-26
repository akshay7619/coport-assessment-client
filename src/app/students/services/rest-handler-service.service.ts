import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RestHandlerServiceService {
  private handleError: HandleError;
  public changeDetect = new Subject<any>();
  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError(environment.appName);
  }

  getChanges(): Observable<any> {
    return this.changeDetect.asObservable();
  }

  postRequest(interfaceUrl: string, action?: any, data?: any, propertyInput?: boolean): Observable<any> {
    if (propertyInput) {
      return this.httpClient.post<any>(
        this.getEndpointURL(action, interfaceUrl), data)
        .pipe(
          catchError(this.handleError('', {}))
        );
    } else {
      return this.httpClient.post<any>(
        this.getEndpointURL(action, interfaceUrl), data)
        .pipe(
          catchError(this.handleError('', {}))
        );
    }
  }

  getRequest(interfaceUrl: string, action?: any): Observable<any> {
    return this.httpClient.get<any>(
      this.getEndpointURL(action, interfaceUrl))
      .pipe(
        catchError(this.handleError('getError', {}))
      );
  }

  deleteRequest(interfaceUrl: string, action?: any): Observable<any> {
    return this.httpClient.delete<any>(
      this.getEndpointURL(action, interfaceUrl))
      .pipe(
        catchError(this.handleError('deleteError', {}))
      );
  }

  patchRequest(interfaceUrl: string, action?: any, data?: any): Observable<any> {
    return this.httpClient.patch<any>(
      this.getEndpointURL(action, interfaceUrl), { ...data })
      .pipe(
        catchError(this.handleError('patchError', action))
      );
  }

  getEndpointURL(action: any, interfaceUrl: string) {
    if (action)
      return `${environment.apiUrl}/${interfaceUrl}/${action}`;
    else
      return `${environment.apiUrl}/${interfaceUrl}`;
  }

}
