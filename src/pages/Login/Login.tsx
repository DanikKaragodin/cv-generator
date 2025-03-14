import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Typography, TextField, Button, Divider, Grid2, Box, Container } from '@mui/material';
import { Google } from '@mui/icons-material';
import { UseLoginStyles } from '@common/styles/loginStyles';
import { LoginData } from '@common/types/Login';
import { emptyLabels, routes } from '@common/constants';
import { validationRules } from '@common/validation';
import { UserAuth } from '@common/contexts/AuthContext';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const { classes } = UseLoginStyles();
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({ mode: 'all', defaultValues: emptyLabels.login });
    const { isAuthorized, signInUser, signUpNewUser } = UserAuth();

    const handleGoogleLogin = () => {
        // Потом сделать (по возможности) логику Google Sign-In
        console.log('Google login Button');
    };

    const onSubmit = async (data: LoginData) => {
        try {
            const result = isLogin
                ? await signInUser(data.email, data.password)
                : await signUpNewUser(data.email, data.password);

            if (result.success) {
                navigate(routes.dashboard.href);
            } else {
                console.error(result.error);
            }
        } catch (err) {
            console.error('An unexpected error occurred: ', err);
        }
    };

    useEffect(() => {
        if (isAuthorized) {
            navigate(routes.dashboard.href);
        }
    }, [isAuthorized, navigate]);

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
                        {...register('email', validationRules.email)}
                        label="Email"
                        variant="outlined"
                        className={classes.formInput}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        {...register('password', validationRules.password)}
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
