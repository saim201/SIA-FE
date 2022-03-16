import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
const OAUTH_CLIENT = 'eagleeye';
const OAUTH_SECRET = 'thisissecret';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    AUTH_SERVICE_URL: string = 'http://localhost:8081';
    redirectUrl = '';
  
    private static handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status},` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
  
    private static log(message: string): any {
      console.log(message);
    }
  
    constructor(private http: HttpClient, private tokenService: TokenService) {
    }
  
    login(loginData: any): Observable<any> {
      console.log(loginData);
      const body = new HttpParams()
        .set('username', loginData.username)
        .set('password', loginData.password)
        .set('grant_type', 'password')
        .set('scop', 'webclient');
      return this.http.post<any>(this.AUTH_SERVICE_URL + "/auth/oauth/token?" + body, "", HTTP_OPTIONS)
        .pipe(
          tap(res => {
            this.tokenService.saveToken(res.access_token);
            this.tokenService.saveRefreshToken(res.refresh_token);
            console.log(this.tokenService.getToken());
          }),
          catchError(AuthService.handleError)
        );
    }
  
    refreshToken(refreshData: any): Observable<any> {
      this.tokenService.removeToken();
      this.tokenService.removeRefreshToken();
      const body = new HttpParams()
        .set('refresh_token', refreshData.refresh_token)
        .set('grant_type', 'refresh_token');
      return this.http.post<any>(this.AUTH_SERVICE_URL + '/oauth/token', body, HTTP_OPTIONS)
        .pipe(
          tap(res => {
            this.tokenService.saveToken(res.access_token);
            this.tokenService.saveRefreshToken(res.refresh_token);
          }),
          catchError(AuthService.handleError)
        );
    }
  
    logout(): void {
      this.tokenService.removeToken();
      this.tokenService.removeRefreshToken();
    }
  
    register(data: any): Observable<any> {
      return this.http.post<any>(this.AUTH_SERVICE_URL + '/oauth/signup', data)
        .pipe(
          tap(_ => AuthService.log('register')),
          catchError(AuthService.handleError)
        );
    }
  
    secured(): Observable<any> {
      return this.http.get<any>(this.AUTH_SERVICE_URL + '/secret')
        .pipe(catchError(AuthService.handleError));
    }
  }