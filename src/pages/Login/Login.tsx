import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Typography, TextField, Button, Divider, Grid2, Box, Container } from '@mui/material';
import { Google } from '@mui/icons-material';
import { loginStyles } from '@common/styles/loginStyles';
import { LoginData } from '@common/types/Login';
import { emptyLabels } from '@common/constants';

function Login() {
    const { classes } = loginStyles();
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({ mode: 'all', defaultValues: emptyLabels.login });

    const handleGoogleLogin = () => {
        // Потом сделать (по возможности) логику Google Sign-In
        console.log('Google login Button');
    };

    const onSubmit = (data: LoginData) => {
        // Потом сделать логику отправки запроса в бэк
        console.log(isLogin ? 'Login' : 'Register', data);
    };

    return (
        <Container className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                    {isLogin ? 'Вход' : 'Регистрация'}
                </Typography>

                <Button
                    variant="outlined"
                    startIcon={<Google />}
                    className={classes.googleButton}
                    onClick={handleGoogleLogin}
                >
                    Продолжить с Google
                </Button>

                <Divider className={classes.divider}>или</Divider>

                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        {...register('email', {
                            required: 'Обязательное поле',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Некорректный email',
                            },
                        })}
                        label="Email"
                        variant="outlined"
                        className={classes.formInput}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        {...register('password', {
                            required: 'Обязательное поле',
                            minLength: {
                                value: 8,
                                message: 'Минимум 8 символов',
                            },
                        })}
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        className={classes.formInput}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Button type="submit" variant="contained" size="large" className={classes.submitButton}>
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>

                <Box className={classes.switchText}>
                    <Typography variant="body2">{isLogin ? 'У вас нет аккаунта?' : 'Уже есть аккаунт?'}</Typography>
                    <Button size="small" onClick={() => setIsLogin(!isLogin)} className={classes.switchTextButton}>
                        {isLogin ? 'Перейти к регистрации' : 'Войти в аккаунт'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
