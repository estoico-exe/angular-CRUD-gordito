import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Student} from "../model/student";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
 // Students Endpoint
  basePath = 'http://localhost:3000/api/v1/students';

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  }
  constructor(private Http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  // Create Student
  create(item: any): Observable<Student> {
    return this.Http.post<Student>(this.basePath, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError));
  }

  // Get Student by id
  getById(id: any): Observable<Student> {
    return this.Http.get<Student>(`${this.basePath}/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError));
  }

  // Get All Students
  getAll(): Observable<Student> {
    return this.Http.get<Student>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

    // Update Student
  update(id: any,item: any): Observable<Student> {
    return this.Http.post<Student>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  //Delete Student
  delete(id: any) {
    return this.Http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
