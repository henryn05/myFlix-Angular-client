import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (res) => {
        this.dialogRef.close();
        this.snackBar.open(`Login success, Welcome ${res.user.Username}`, 'OK', {
          duration: 2000
        });
        let user = {
          ...res.user,
          id: res.user._id,
          password: this.userData.Password,
          token: res.token
        }
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.token);
        this.router.navigate(["movies"]);
      },
      (err) => {
        this.snackBar.open(err, "NOT OK", {
          duration: 2000
        });
      }
    );
  }
}
