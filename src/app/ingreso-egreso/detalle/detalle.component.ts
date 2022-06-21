import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  private itemSubs: Subscription;
  public items: IngresoEgreso[];

  constructor(
    private store: Store<AppState>,
    private ingEgrSrv: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.itemSubs = this.store
      .select('items')
      .subscribe(({ items }) => (this.items = items));
  }

  ngOnDestroy(): void {
    this.itemSubs.unsubscribe();
  }

  delete(uid?: string) {
    if (!uid) return;
    this.ingEgrSrv
      .deleteItem(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch((err) => Swal.fire('Error', err.message, 'error'));
  }
}
