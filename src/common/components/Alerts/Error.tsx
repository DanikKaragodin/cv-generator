import { UseMUIStyles } from '@common/styles/muiStyles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Container from '@mui/material/Container';

function Error() {
    const { classes: muiclasses } = UseMUIStyles();
    return (
        <Container maxWidth="lg" className={muiclasses.loadContainer}>
            <Alert severity="error">
                <AlertTitle>Ошибка</AlertTitle>
                Не удаётся загрузить данные с сервера. Проверьте правильная ли ссылка
            </Alert>
        </Container>
    );
}

export default Error;
