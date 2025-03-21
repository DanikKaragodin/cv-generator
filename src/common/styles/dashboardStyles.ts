import { makeStyles } from 'tss-react/mui';

export const UseDashboardStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    divider: {
        height: 24,
        width: 1,
        backgroundColor: theme.palette.divider,
        margin: theme.spacing(0, 1),
    },
    emptyState: {
        textAlign: 'center',
        padding: theme.spacing(4),
    },
    paper: {
        position: 'relative',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    indexNumber: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        opacity: 0.7,
        fontSize: '1.25rem',
        fontWeight: 400,
    },
    cvItemContent: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
        flexWrap: 'wrap',
        flexGrow: 1,
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
    },
    cvItemText: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    buttonGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '100%',
            justifyContent: 'center',
        },
    },
    createButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));
