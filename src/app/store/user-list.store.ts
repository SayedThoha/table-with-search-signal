import { Injectable, signal } from '@angular/core';
import { User } from '../dto/users.dto';
import { UserList } from '../services/user-list';

@Injectable({
  providedIn: 'root',
})
export class UserListStore {
  users = signal<User[]>([]);
  loading = signal<boolean>(false);

  constructor(private userListService: UserList) {}

  getUsers(): void {
    this.loading.set(true);
    this.userListService.list().subscribe({
      next: (res: User[]) => {
        this.users.set(res);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading.set(false);
      },
    });
  }

  resetEntireState(): void {
    this.users.set([]);
    this.loading.set(false);
  }
}
