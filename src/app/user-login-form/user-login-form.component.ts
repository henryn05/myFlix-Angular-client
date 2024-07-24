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
    username: "",
    password: "",
    email: "",
    birthday: ""
  };

  constructor(
    public fetchApiData: UserService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /** Login user
   * @returns {void}
   * @throws {error}
  */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData)
      .subscribe(res => {
        // Logic for successful login
        this.dialogRef.close();
        this.snackBar.open("Login success", "OK", {
          duration: 2000
        });
        let user = {
          ...res.user,
          id: res.user.id,
          password: this.userData.password,
          token: res.token
        }
        debugger;
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["movies"]);
      }, res => {
        // Logic for unsuccessful login
        this.snackBar.open("Login fail", "OK", {
          duration: 2000
        });
      });
  }
}