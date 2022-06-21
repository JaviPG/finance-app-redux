import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as items from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  items: items.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  items: items.ingresoEgresoReducer,
};
