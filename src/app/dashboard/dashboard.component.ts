import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as itemsActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  itemsSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingEgrSrv: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        if (!user) return;
        this.itemsSubscription = this.ingEgrSrv
          .initIngresosEgresosListener(user.uid)
          .subscribe((items) =>
            this.store.dispatch(itemsActions.setItems({ items }))
          );
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.itemsSubscription?.unsubscribe();
  }
}
