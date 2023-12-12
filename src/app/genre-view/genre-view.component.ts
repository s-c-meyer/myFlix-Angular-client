import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss'
})
export class GenreViewComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  genreName: any;
  genreDesc: any;

  ngOnInit(): void {
    
  }
}