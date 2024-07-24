import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = "https://myflix-api-hn05.onrender.com";

export interface director {
  name: string,
  bio: string,
};

export interface genre {
  name: string,
  description: string,
};

@Injectable({
  providedIn: "root"
})


export class UserService{
  // Inject the HttpClient module to the constructor params;
  // This will provide HttpClient to the entire class, making it available via this.http
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

  /**
   * Create new user
   * @param {object} userDetails must include username, password, email, and date of birth
   * @returns
  */
  public userRegistration(userDetails: any) : Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "/users", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Login user
   * @param {object} userDetails must include username and password
   * @returns
   */
  public userLogin(userDetails: any) : Observable<any> {
    return this.http.post(apiUrl + "/login", userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Gets all movies
   * @returns
   */
  getAllMovies() : Observable<any> {
    const token = (localStorage as any).getItem("token");
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

  /**
   * Get one specific movie
   * @param {string} title title of the movie
   * @returns
   */
  getOneMovie(title: string) : Observable<any> {
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

  /**
   * Get one director for a specific movie
   * @param {object} director must include name and bio
   * @returns
   */
  getDirector(director: director) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/directors/" + director.name, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get one genre for a specific movie
   * @param {object} genre must include name and description
   * @returns
   */
  getGenre(genre: genre) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/genre/" + genre.name, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get one user
   * @returns
  */
  getUser() : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    return user;
  }

  /**
   * Get user's favorite movies list
   * @param {string} userID user's uniquely generated ID
   * @returns
   */
  getFavoriteMovies(userID: string) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/users/" + userID, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Add movie to user's favorite list
   * @param {string} userID user's uniquely generated ID
   * @param {string} title favorited movie's title
   * @returns
   */
  addToFavoriteMovies(userID: string, title: string) : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http
      .post(apiUrl + "/users/" + userID + title, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Edit user's details
   * @param {object} userDetails must include username, password, email, and date of birth
   * @returns
   */
  editUser(userDetails: any) : Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .put(apiUrl + "/users/" + userDetails.id + userDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Delete user permanently
   * @returns
   */
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

  /**
   * Delete movie from user's favorited list
   * @param {string} userID user's uniquely generated ID
   * @param {string} title favorited movie's title
   * @returns
  */
  deleteFromFavoriteMovies(userID: string, title: string) : Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "/users/" + userID + title, {
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
