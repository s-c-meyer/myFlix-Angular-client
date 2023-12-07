import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})

export class ProfileViewComponent implements OnInit {
  favoriteMovies: any[] = [];
  currentUser: any = {};

  constructor(
    public router: Router) { }
 
  ngOnInit(): void {
    this.displayUserInfo();
  }

  displayUserInfo(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '[]');
    console.log(this.currentUser);
    console.log('Favorite Movies Length is: ' + this.currentUser.FavoriteMovies.length);
  }
}
