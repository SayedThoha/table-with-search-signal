import { computed, Injectable, signal } from '@angular/core';
import { User } from '../dto/users.dto';
import { UserList } from '../services/user-list';

@Injectable({
  providedIn: 'root',
})
export class UserListStore {
  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  searchQuery = signal<string>('');

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

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const users = this.users();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company?.name.toLowerCase().includes(query) ||
        user.address?.city.toLowerCase().includes(query),
    );
  });

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  resetEntireState(): void {
    this.users.set([]);
    this.loading.set(false);
    this.searchQuery.set('');
  }
}
