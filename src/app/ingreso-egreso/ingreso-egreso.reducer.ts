import { createReducer, on } from '@ngrx/store';
import * as inegActions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithItem extends AppState {
  items: State;
}

export const initialState: State = {
  items: [],
};

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(inegActions.setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),
  on(inegActions.unSetItems, (state) => ({
    ...state,
    items: [],
  }))
);
