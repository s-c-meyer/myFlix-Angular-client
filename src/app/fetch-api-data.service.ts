import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://moviesappmyflix-02f853986708.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * Provides functions to interact with the API
 */
export class FetchApiDataService {
  constructor(
    private http: HttpClient) { }
 
  /**
   * Makes the API call for the user registration endpoint
   * 
   * @param userDetails The user object that contains username, password, etc
   * @returns The posted user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  
  /**
   * Makes the API call for the user login endpoint
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Handles errors
   * 
   * @param error The current error thrown
   * @returns throwError()
   */
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

  /**
   * Makes a GET call to the API for all the movies in the database 
   * 
   * @returns The array of movie objects
   */
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

  /**
   * Makes a GET call to the API for one specific movie 
   * 
   * @param movieId The unique identifier of the movie you want to GET
   * @returns A single movie object 
   */
  getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a GET call to the API for one director
   * 
   * @param directorName The name of the director you would like to get
   * @returns A single director object
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + directorName, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a GET call to the API for one genre
   * 
   * @param genreName The name of the genre you would like to get
   * @returns A single genre object
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + genreName, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a GET call to the API for a user's information 
   * 
   * @param username The username of the user you would like to get
   * @returns The specified user object
   */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a GET call to the API for a user's favorite movie list
   * 
   * @param username The username of the user whos favorite movies list you would like to get
   * @returns An array of movie ID's corresponding to the user's favorite movies
   */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users' + username + 'movies', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Makes a POST call to the API to add a Favorite Movie to the user's list,
   * uses the current user from localStorage
   * 
   * @param movieId The unique identifier of the movie to add to the list
   * @returns The movie object
   */
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

  /**
   * Makes a DELETE call to the API to remove a Favorite Movie from the user's list
   * 
   * @param username The username of the user whos favorite movies list you would like remove from 
   * @param movieId The unique identifier of the movie to be removed
   * @returns The deleted movie
   */
  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users' + username + 'movies' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a POST call to the API to edit the user's information
   * 
   * @param username The username of the user to be edited
   * @returns The edited user object
   */
  editUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes a DELETE call to the API to remove a user from the database
   * 
   * @param username The username of the user to be deleted
   * @returns The deleted user object
   */
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
/**
 * A simple respone extraction
 * 
 * @param res The response to be extracted
 * @returns The response
 */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
