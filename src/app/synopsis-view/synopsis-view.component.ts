import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrl: './synopsis-view.component.scss'
})

/**
 * This class creates the SynopsisViewComponent, which is displayed
 * when the user opens the synopsis dialog
 */
export class SynopsisViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  summary: any;

  ngOnInit(): void {
    
  }
}
