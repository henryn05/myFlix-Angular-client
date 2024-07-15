import { Component, OnInit } from '@angular/core';
import { UserService, director, genre } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  director: any[] = [];
  genre: any[] = [];
  details: any[] = [];
  movieId: any[] = [];

  constructor(public fetchApiData: UserService) { }

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

  getDirector(director: director): void {
    this.fetchApiData.getDirector(director).subscribe((result: any) => {
      this.director = result;
      console.log(this.director);
      return this.director;
    });
  }

  getGenre(genre: genre): void {
    this.fetchApiData.getGenre(genre).subscribe((result: any) => {
      this.genre = result;
      console.log(this.genre);
      return this.genre;
    });
  }

  getDetails(details: any): void {
    this.fetchApiData.getOneMovie(details).subscribe((result: any) => {
      this.details = result;
      console.log(this.details);
      return this.details;
    });
  }

  addToFavoriteMovies(movieId: any): void {
    this.fetchApiData.addToFavoriteMovies(movieId).subscribe((result: any) => {
      console.log(result);
      return result;
    });
  }
}
