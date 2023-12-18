import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})

/**
 * This class creates the ProfileViewComponent, which is displayed
 * when the user clicks on the Profile View button the main page.
 * This routes the user to /profile
 */
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

  /**
   * Retrieves the user info from localStorage, and filters through the array of all movies to find
   * the movie objects that match the user's FavoriteMovies
   */
  displayUserInfo(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '[]');
    
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any; }) => this.currentUser.FavoriteMovies.indexOf(m._id) >=0);
    })
  }

  /**
   * Routes back to /movies 
   */
  showMovieView(): void {
    this.router.navigate(['movies']);
  }
}
