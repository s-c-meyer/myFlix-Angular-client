import { Component, Injectable, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

/**
 * This class creates the Movie Card Component, which displays every movie in the database
 */
export class MovieCardComponent  {
  movies: any[] = [];
  currentMovieGenre: any;
  currentGenreDesc: any;
  currentUser: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This function gets all movies from the database
   * 
   * @returns an array of movie objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Add's the current movie to the logged in user's FavoriteMovie's list. Also displays a snackbar to let 
   * the user know the movie has been successfully added
   * 
   * @param movieId The unique ID given to the movie in the database
   */
  favoriteMovie(movieId: any): void {
    // this.currentUser = JSON.parse(localStorage.getItem('user') || '[]');
    // console.log(this.currentUser.Username);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Movie added to Favorites!', 'OK', {
        duration: 2000
      });
      console.log(movieId);
    })
  }

  /**
   * Routes the user to the profile view
   */
  showProfileView(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Opens a dialog that tells the user more about the movie's genre,
   * including the genre name and description
   * 
   * @param genre The genre of the current movie
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '350px',
      data: { //passing this data, and using @Inject on genre-view, we can pass the data effectively
        name: genre.Name,
        desc: genre.Description
      },
    });
  }

  /**
   * Opens a dialog that tells the user more about the movie's director,
   * including the director's name, bio, and birth year
   * 
   * @param director The director of the current movie
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorViewComponent, {
      width: '350px',
      data: {
        name: director.Name,
        bio: director.Bio,
        birthYear: director.Birth
      },
    });
  }

  /**
   * Opens a dialog that tells the user the synopsis of the current movie
   * 
   * @param summary 
   */
  openSynopsisDialog(summary: any): void {
    this.dialog.open(SynopsisViewComponent, {
      width: '350px',
      data: {
        summary: summary,
      },
    });
  }

  logoutUser(): void {
    localStorage.clear;
    this.router.navigate(['welcome']); //navigates to the welcome route once you are logged out
    this.snackBar.open('User Logout Successful', 'OK', {
      duration: 2000
    });
  }
}
