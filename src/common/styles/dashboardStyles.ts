import { makeStyles } from 'tss-react/mui';

export const dashboardStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    gridItem: {
        position: 'relative',
        cursor: 'pointer',
    },
    paper: {
        aspectRatio: '1 / 1',
        padding: theme.spacing(2),
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
        },
    },
    indexNumber: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        opacity: 0.3,
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    cvName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    button: {
        textTransform: 'none',
        boxShadow: theme.shadows[2],
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
        },
    },
}));
