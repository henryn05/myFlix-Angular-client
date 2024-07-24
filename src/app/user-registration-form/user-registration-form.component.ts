import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UserService } from "../fetch-api-data.service";

// Decorator tells Angular that this is a component
@Component({
  // Selector defines HTML element that component will render in
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: UserService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
}

/** Registering a new user
 * @returns {void}
 * @throws {error}
*/
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData)
    .subscribe((res) => {
      // Logic for a successful user registration goes here!
      // Close modal on success
      this.dialogRef.close();
      console.log(res);
      this.snackBar.open("User registered successfully!", "OK", {
        duration: 2000,
      });
    }, (res) => {
      this.snackBar.open(res, "OK", {
        duration: 2000,
      });
    });
  }
}