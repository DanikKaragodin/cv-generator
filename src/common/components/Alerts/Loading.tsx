import { UseMUIStyles } from '@common/styles/muiStyles';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

function Loading() {
    const { classes: muiclasses } = UseMUIStyles();
    return (
        <Container maxWidth="lg" className={muiclasses.loadContainer}>
            <CircularProgress size={160} />
        </Container>
    );
}

export default Loading;
