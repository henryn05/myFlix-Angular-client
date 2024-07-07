import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})

export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: ""
  };

  constructor(
    public fetchApiData: UserService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData)
      .subscribe((result) => {
        // Logic for successful login
        this.dialogRef.close();
        this.snackBar.open("User logged in successfully!", "OK", {
          duration: 2000
        });
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open(result, "OK", {
          duration: 2000
        });
      });
  }
}