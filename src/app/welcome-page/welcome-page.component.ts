import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})

/**
 * This class creates a welcome page, which allows a user to either register or login
 */
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * This function will open a dialog that allows the user to register for the app
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }

  /**
   * This function will open a dialog that allows the user to login to the app
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
