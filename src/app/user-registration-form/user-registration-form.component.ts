import { Component, OnInit, Input } from '@angular/core';

//This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

//This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ //use the component decorator to tell Angular that the class right below is a component
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})

/**
 * This class creates a user registration form to be used on the welcome page
 */
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

 
  /**
   * Registers the user, posting their information to the database, and
   * notifying the user that the registration was successful
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //Logic for a successful user registration goes here (to be implemented)
      this.dialogRef.close(); //close the modal on a success
      console.log(result);
      this.snackBar.open('User registration successful', 'OK', { //if this line has result, like it shows in the example, then it doesn't work
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
