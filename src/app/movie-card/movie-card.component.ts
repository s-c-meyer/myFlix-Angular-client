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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

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

  showProfileView(): void {
    this.router.navigate(['profile']);
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreViewComponent, {
      width: '350px',
      data: { //passing this data, and using @Inject on genre-view, we can pass the data effectively
        name: genre.Name,
        desc: genre.Description
      },
    });
  }

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

  openSynopsisDialog(summary: any): void {
    this.dialog.open(SynopsisViewComponent, {
      width: '350px',
      data: {
        summary: summary,
      },
    });
  }
}
