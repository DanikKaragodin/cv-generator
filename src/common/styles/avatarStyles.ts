import { makeStyles } from 'tss-react/mui';

export const avatarStyles = makeStyles()({
    preview: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: 10,
    },
    inputHidden: { display: 'none' },
    textRecomendation: { mt: 1 },
});
