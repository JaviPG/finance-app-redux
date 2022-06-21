import { createReducer, on } from '@ngrx/store';
import * as inegActions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[];
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
