import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { User } from '../dto/users.dto';
import { Observable } from 'rxjs';

@Service()
export class UserList {
  private http = inject(HttpClient);
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
