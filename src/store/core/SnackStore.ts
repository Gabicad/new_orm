import { createStoreon, StoreonModule } from 'storeon';

export interface SnackState {
  open: boolean;
  message: string;
  type: string;
}
// Events declaration: map of event names to type of event data
export interface SnackEvents {
  setMessage: SnackState;
}

export const SnackModule: StoreonModule<SnackState, SnackEvents> = (store) => {
  store.on('@init', () => ({ open: false, message: '', type: 'success' }));

  store.on('setMessage', (state, payload: SnackState) => ({
    open: payload.open,
    message: payload.message,
    type: payload.type
  }));
};

export const snackStore = createStoreon<SnackState, SnackEvents>([SnackModule]);
