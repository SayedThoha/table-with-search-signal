import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { UserListStore } from '../store/user-list.store';

@Component({
  imports: [],
  selector: 'app-users-list',
  styleUrl: './users-list.css',
  templateUrl: './users-list.html',
})
export class UsersList implements OnInit, OnDestroy {
  searchQuery = signal<string>('');

  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const users = this.userListStore.users();
    if (!query) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company?.name.toLowerCase().includes(query) ||
        user.address?.city.toLowerCase().includes(query)
    );
  });

  constructor(public userListStore: UserListStore) {}

  ngOnInit(): void {
    this.userListStore.getUsers();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  ngOnDestroy(): void {
    this.userListStore.resetEntireState();
  }
}
