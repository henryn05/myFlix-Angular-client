import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
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
  @Input() searchQuery: string = "";

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Get every movie
   * @returns {void}
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      let user = JSON.parse(localStorage.getItem("user") || "");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.Favorite_movies.includes(movie._id);
      });
      return this.movies;
    }, err => {
      console.log(err);
    });
  }

  getFilteredMovies(): any[] {
    if (!this.searchQuery.trim()) {
      return this.movies;
    }

    return this.movies.filter(movie => movie.Title.toLowerCase()
      .includes(this.searchQuery.toLowerCase()));
  }
  /**
   * Shows modal with director details
   * @param {object} movie
  */
  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: "400px"
    });
  }

  /**
   * Shows modal with genre details
   * @param {object} movie
  */
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      },
      width: "400px"
    })
  }

  /**
   * Shows modal with movie details
   * @param {object} movie
  */
  showDetails(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: "400px"
    });
  }

  /**
   * Add or remove movie from user's favorite list
   * @param {object} movie
  */
  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.Favorite_movies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movie._id).subscribe(res => {
        icon?.setAttribute("fontIcon", "favorite_border");

        console.log("del success")
        console.log(res);
        user.Favorite_movies = res.Favorite_movies;
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err)
      })
    } else {
      this.fetchApiData.addFavoriteMovie(user.Username, movie._id).subscribe(res => {
        icon?.setAttribute("fontIcon", "favorite");

        console.log("add success")
        console.log(res);
        user.Favorite_movies = res.Favorite_movies;
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err)
      })
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  isFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.Favorite_movies.includes(movie._id);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  redirectProfile(): void {
    this.router.navigate(["user"]);
  }
}