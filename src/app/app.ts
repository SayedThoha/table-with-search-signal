import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './users-list/users-list';

@Component({
  imports: [UsersList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('search-table');
}
