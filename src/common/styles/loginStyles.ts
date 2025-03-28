import { makeStyles } from 'tss-react/mui';

export const UseLoginStyles = makeStyles()((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        maxWidth: 400,
        padding: theme.spacing(4),
        position: 'relative',
        textAlign: 'center',
    },
    googleButton: {
        width: '100%',
        marginBottom: theme.spacing(3),
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
    divider: {
        marginBottom: 3,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    formInput: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    submitButton: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    switchText: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    switchTextButton: {
        marginTop: theme.spacing(1),
    },
}));
