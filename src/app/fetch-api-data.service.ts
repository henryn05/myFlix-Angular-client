import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = "https://myflix-api-hn05.onrender.com";
@Injectable({
  providedIn: "root"
})

export class UserService{
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class,
  // making it available via this.http
  constructor(private http: HttpClient) {

  }

  private extractResponseData(res: any) : any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) : any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured: ", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  // API call for "user registration" endpoint
  public userRegistration(userDetails: any) : Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "/users", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for "user login" endpoint
  public userLogin(userDetails: any) : Observable<any> {
    return this.http.post(apiUrl + "/login", userDetails).pipe(
      catchError(this.handleError)
    )
  }

  // API call for "get all movies" endpoint
  getAllMovies() : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "get one movie" endpoint
  getOneMovie(title:string) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/" + title, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "get director" endpoint
  getDirector(name:string) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/directors/" + name, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "get genre" endpoint
  getGenre(name:string) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/genre/" + name, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for "get user" endpoint
  getUser() : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    return user;
  }

  // API call for "get favorite movies" endpoint
  getFavoriteMovies(username: string) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/users/" + username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "add to favorite movies" endpoint
  addToFavoriteMovies(movie: any) : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http
      .post(apiUrl + "/users/" + user.Username + "/movies/" + movie._id, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "edit user info" endpoint
  editUser(user: any, userDetails: any) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .put(apiUrl + "/users/" + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // API call for "delete user" endpoint
  deleteUser() : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "/users/" + user.Username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // API call for "delete from favorite movies" endpoint
  deleteFromFavoriteMovies(movie: any) : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "/users/" + user.Username + "/movies/" + movie._id, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
}
