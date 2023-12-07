import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss'
})
export class GenreViewComponent implements OnInit {
  
  constructor(@Inject(MovieCardComponent) private currentMovie: MovieCardComponent) { }


  genreName: any;
  genreDesc: any;


  ngOnInit(): void {
    this.setMovieGenre();
  }

  setMovieGenre(): void {
    this.genreName = this.currentMovie.currentMovieGenre;
    this.genreDesc = this.currentMovie.currentGenreDesc;
    return this.genreName;
  };
}
