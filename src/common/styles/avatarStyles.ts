import { makeStyles } from 'tss-react/mui';

export const avatarStyles = makeStyles()({
    avatarDiv: {
        width: '95%',
        padding: '10px 0px',
        border: '1px rgba(0, 0, 0, 0.24) solid',
        borderRadius: '4px',
    },
    preview: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: 10,
    },
    button: {
        margin: '5px 2px',
    },
    inputHidden: { display: 'none' },
    textRecomendation: { mt: 1 },
});
