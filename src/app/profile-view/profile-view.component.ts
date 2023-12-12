import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})

export class ProfileViewComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  currentUser: any = {};

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,) { }
 
  ngOnInit(): void {
    this.displayUserInfo();
  }

  // getMovies(): void {
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     this.movies = resp;
  //     console.log('this.movies should be below this');
  //     console.log(this.movies); //do somethnig with this JSON.stringify??? Something is not in the right format? 
  //     return this.movies;
  //   });
  // }

  displayUserInfo(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '[]');
    
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any; }) => this.currentUser.FavoriteMovies.indexOf(m._id) >=0);
    })
  }

  showMovieView(): void {
    this.router.navigate(['movies']);
  }
}
