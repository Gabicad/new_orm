import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';

export interface ISimpleDialog {
  children: React.ReactNode;
  open: boolean;
  title?: string;
  onClose: () => void;
}

export interface ISimpleDialogWithButton {
  children: React.ReactNode;
  buttonTitle?: string;
  title?: string;
}

const SimpleDialog: React.FC<ISimpleDialog> = ({
  children,
  open,
  title,
  onClose
}: ISimpleDialog) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className={'h2'}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const SimpleDialogWithButton: React.FC<ISimpleDialogWithButton> = ({
  children,
  title,
  buttonTitle
}: ISimpleDialogWithButton) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  buttonTitle = buttonTitle ?? title;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleClose });
    }
    return child;
  });

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <SimpleDialog onClose={handleClose} title={title} open={open}>
        {childrenWithProps}
      </SimpleDialog>
    </>
  );
};
export default SimpleDialogWithButton;
