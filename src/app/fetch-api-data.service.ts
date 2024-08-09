import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix-api-hn05.onrender.com";

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  private getToken(): string {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).token : "";
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      const errorBody = typeof error.error === 'object' ? JSON.stringify(error.error) : error.error;
    	console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${errorBody}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  /**
   * Create new user
   * @param {object} userDetails must include username, password, and email. Optional: birthday
   * @returns {Observable<any>}
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + "/users", userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Login
   * @param {object} userDetails must include username and password
   * @returns {Observable<any>}
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + "/login", userDetails)
      .pipe(catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @returns {Observable<any>}
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + "/movies", {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Get movie with specific ID
   * @param {string} id
   * @returns {Observable<any>}
   */
  public getMovieWithID(id: string): Observable<any> {
    return this.http.get(apiUrl + `/movieid/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Get movie with title
   * @param {string} title Movie's title
   * @returns {Observable<any>}
   */
  public getMovieWithTitle(title: string): Observable<any> {
    return this.http.get(apiUrl + `/movie/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Get director with name
   * @param {string} directorName
   * @returns {Observable<any>}
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `/director/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Get all users
   * @returns {Observable<any>}
   */
  public getUserList(): Observable<any> {
    return this.http.get(apiUrl + `/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }
  /**
   * Add movie to user's favorite list
   * @param {string} userID
   * @param {string} title movie's title
   * @returns {Observable<any>}
   */
  public addFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.post(apiUrl + `/user/${userID}/${title}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Delete a movie from user's favorite list
   * @param {string} userID
   * @param {string} title
   * @returns {Observable<any>}
   */
  public deleteFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.delete(apiUrl + `/user/${userID}/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Change user's details
   * @param {object} userDetails must include all the fields of user object
   * @returns {Observable<any>}
   */
  public editUser(userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `/user/${userDetails.id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Delete user
   * @param {string} userID
   * @returns {Observable<any>}
   */
  public deleteUser(userID: string): Observable<any> {
    return this.http.delete(apiUrl + `/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
      body: JSON.stringify({ id: userID })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
