import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null;
  userSubs: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
