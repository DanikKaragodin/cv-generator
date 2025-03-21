import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog = ({ open, title, message, onConfirm, onCancel }: ConfirmationDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Отмена
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
