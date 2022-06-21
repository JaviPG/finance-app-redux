import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;

  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) return;

    this.store.dispatch(uiActions.isLoading());

    // Swal.fire({
    //   title: 'Registrando cuenta...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { nombre, correo, password } = this.registroForm.value;

    this.authSrv
      .crearUsuario(nombre, correo, password)
      .then((credentials) => {
        // Swal.close();
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
