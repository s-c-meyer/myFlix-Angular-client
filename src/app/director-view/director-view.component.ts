import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss'
})
export class DirectorViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  directorName: any;
  directorBio: any;
  directorBirthYear: any;

  ngOnInit(): void {
    
  }
}
