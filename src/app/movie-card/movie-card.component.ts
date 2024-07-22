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
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.director.name,
        content: movie.director.bio
      },
      width: "300px"
    });
  }

  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.genre.name,
        content: movie.genre.description
      },
      width: "300px"
    });
  }

  showDetails(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.title,
        content: movie.description
      },
      width: "300px"
    });
  }

  addToFavoriteMovies(movieId: any): void {
    this.fetchApiData.addToFavoriteMovies(movieId).subscribe((result: any) => {
      console.log(result);
      return result;
    });
  }
}
