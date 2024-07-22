import { Component, OnInit } from '@angular/core';
import { UserService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: "400px"
    });
  }
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      },
      width: "400px"
    })
  }

  showDetails(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: "400px"
    });
  }

  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFromFavoriteMovies(movie._id)
        .subscribe(res => {
          icon?.setAttribute("fontIcon", "favorite_border");

          console.log("delete success");
          console.log(res);

          user.favoriteMovies = res.favoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
        });
    } else {
      this.fetchApiData.addToFavoriteMovies(movie._id)
        .subscribe(res => {
          icon?.setAttribute("fontIcon", "favorite");

          console.log("add success");
          console.log(res);

          user.favoriteMovies = res.favoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
        }, err => console.log(err));
     };
  }
}
