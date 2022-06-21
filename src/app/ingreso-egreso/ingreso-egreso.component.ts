import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  type: string = 'ingreso';
  isLoading: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private inegSrv: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.isLoading = isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save() {
    if (this.ingresoForm.invalid) return;
    this.store.dispatch(uiActions.isLoading());
    const { description, quantity } = this.ingresoForm.value;
    const data = new IngresoEgreso(description, quantity, this.type);
    this.inegSrv
      .createIngresoEgreso(data)
      .then(() => {
        this.store.dispatch(uiActions.stopLoading());
        this.ingresoForm.reset();
        Swal.fire('Registro creado', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
