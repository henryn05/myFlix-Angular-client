import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss"
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  Favorite_movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");

  }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getfavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.Favorite_movies = res.filter((movie: any) => {
        return this.userData.Favorite_movies.includes(movie._id);
      });
    }, (err: any) => {
      console.error(err);
    });
  }

  getUser(): void {
    this.fetchApiData.getSpecificUser(this.userData.Username)
      .subscribe((res: any) => {
        return this.getfavoriteMovies();
      }
    )
  }

  removeFromFavorite(movieID : string): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    this.fetchApiData.deleteFavoriteMovie(user.Username, movieID).subscribe((res: any) => {
      this.userData.Favorite_movies = res.Favorite_movies;
      user.Favorite_movies = res.Favorite_movies;
      this.getfavoriteMovies();
      console.log("del success")
      console.log(res);
      localStorage.setItem("user", JSON.stringify(user));
    }, (err: any) => {
      console.error(err)
    })
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}