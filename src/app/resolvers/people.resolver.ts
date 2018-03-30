import { Resolve } from '@angular/router';
import { People } from '../models/people.models';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleResolver implements Resolve<People> {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  resolve(): Observable<People> {
    return this.http.get<People>(this.apiUrl);
  }
}
