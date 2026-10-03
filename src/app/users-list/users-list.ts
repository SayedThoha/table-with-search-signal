import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { UserListStore } from '../store/user-list.store';

@Component({
  imports: [],
  selector: 'app-users-list',
  styleUrl: './users-list.css',
  templateUrl: './users-list.html',
})
export class UsersList implements OnInit, OnDestroy {
  

  constructor(public userListStore: UserListStore) {}

  ngOnInit(): void {
    this.userListStore.getUsers();
  }

  

  ngOnDestroy(): void {
    this.userListStore.resetEntireState();
  }
}
