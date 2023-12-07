import { Component, Injectable, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent  {
  movies: any[] = [];
  currentMovieGenre: any;
  currentGenreDesc: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog) { }

  //called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showProfileView(): void {
    //navigate to profile route
    this.router.navigate(['profile']);
  }

  openGenreDialog(genre: any): void {
    this.currentMovieGenre = genre.Name;
    this.currentGenreDesc = genre.Description
    console.log('Current Genre Description is: ' + this.currentGenreDesc)
    this.dialog.open(GenreViewComponent, {
      width: '280px'
    });
  }



}
