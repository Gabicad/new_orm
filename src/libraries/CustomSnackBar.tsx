import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackState, snackStore } from '../store/core/SnackStore';
import { AlertColor } from '@mui/material/Alert/Alert';

export interface State {
  open: boolean;
}

export default function CustomSnackbar() {
  const [internalState, setInternalState] = React.useState<SnackState>(snackStore.get());
  snackStore.on('@dispatch', (state, [event, data]) => {
    if (event === 'setMessage' && data.open !== internalState.open) {
      setInternalState(data);
      // TODO its called a multiple times refactor the logic
    }
  });

  const { open, type, message } = internalState;
  const handleClose = () => {
    snackStore.dispatch('setMessage', { open: false, message: '', type: '' });
  };

  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          open={open}
          onClose={handleClose}
          message={message}>
          <Alert onClose={handleClose} severity={type as AlertColor} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
