import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://moviesappmyflix-02f853986708.herokuapp.com/';
//should I just define token here?

// const httpHeaders: HttpHeaders = new HttpHeaders({
//   Authorization: 'Bearer ' + localStorage.getItem('token')
// });

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(
    private http: HttpClient) { }
 
  // httpHeader = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token'),
  //   }),
  // };
  
  //making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //api call for the login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof HttpErrorResponse) { //changed ErrorEvent to HttpErrorResponse, because it was throwing errors, per 'https://stackoverflow.com/questions/56577315/error-referenceerror-errorevent-is-not-defined-for-nativescript-app'
      console.error("Some error occurred:", error.error.message);
    } else {
      const errorMessage = error.error ? error.error : error
      console.error(
        `Error Status code is ${error.status}, ` +
        `Error body is: ${errorMessage}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        'Authorization': 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  //Get One Movie
  getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + directorName, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + genreName, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users' + username + 'movies', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  
  addFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '[]');
    const token = localStorage.getItem('token');
    //need to iterate through user.FavoriteMovies to make sure that the movie isn't already contained within
    //FavoriteMovies.length is then only correct when logging out and back in if you add a favorite movie on top of the other
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    //simply adding the {} before headers fixed my issue with 401 error. 
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token, 
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //using method setting httpHeader directly under constructor
  // addFavoriteMovie(username: string, movieId: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, this.httpHeader).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  //using const httpHeaders declared above constructor 
  // addFavoriteMovie(username: string, movieId: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, { headers: httpHeaders }).pipe(
  //     map(this.extractResponseData),
  //     catchError(this.handleError)
  //   );
  // }

  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + username + 'movies' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
