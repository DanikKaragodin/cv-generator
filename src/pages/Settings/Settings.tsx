import { TEST_IDS } from '@common/constants';
import './Settings.css';
import { Autocomplete, Button, Chip, Container, TextField } from '@mui/material';
import { FormData } from '@common/types/Labels.ts';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { UseMUIStyles } from '@common/styles/muiStyles';
import { UserAuth } from '@common/contexts/AuthContext';
import { useEffect, useMemo } from 'react';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { validationRules } from '@common/validation';

function Settings() {
    const { session, insertDefaultsbyUserID, selectDefaultsbyUserID } = UserAuth();
    const { classes } = UseMUIStyles();
    const defaultState = useMemo(() => {
        return {
            id: '',
            name: '',
            lastName: '',
            email: '',
            telephone: '',
            aboutMe: '',
            technicalSkills: [],
            languageLabels: [],
            educationLabels: [],
            courseLabels: [],
            positionLabels: [],
        };
    }, []);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: 'all',
        defaultValues: defaultState,
    });

    const onSubmit: SubmitHandler<FormData> = async (inputData) => {
        console.log('Собранные данные:', inputData);
        try {
            if (session?.user.id) {
                const result = await insertDefaultsbyUserID(session.user.id, inputData);
                if (result.success) {
                    console.log('good!');
                } else {
                    console.error(result.error);
                }
            }
        } catch (err) {
            console.error('An unexpected error occurred: ', err);
        }
    };

    useEffect(() => {
        const loadDefaultsData = async () => {
            if (session?.user?.id) {
                try {
                    const { success, error, data } = await selectDefaultsbyUserID(session.user.id);
                    console.log(success, error, data);
                    if (success) {
                        if (data) reset(data);
                    } else {
                        console.error(error);
                    }
                } catch (e) {
                    console.error('Произошла ошибка при загрузке данных: ', e);
                }
            } else {
                reset(defaultState);
                return;
            }
        };

        loadDefaultsData();
    }, [session?.user?.id]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container data-test-id={TEST_IDS.settings} maxWidth="sm">
                <Paper elevation={4} className={classes.paper}>
                    <CardHeader title="Настройки по умолчанию" />
                    <Divider />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                        <CenteredGrid size={6}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        id="user-name"
                                        label="Имя"
                                    />
                                )}
                            />
                        </CenteredGrid>

                        <CenteredGrid size={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        label="Фамилия"
                                        id="user-last_name"
                                    />
                                )}
                            />
                        </CenteredGrid>

                        <CenteredGrid size={6}>
                            <Controller
                                name="email"
                                control={control}
                                rules={validationRules.email}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        label="E-mail"
                                        id="user-email"
                                    />
                                )}
                            />
                        </CenteredGrid>

                        <CenteredGrid size={6}>
                            <Controller
                                name="telephone"
                                control={control}
                                rules={validationRules.phone}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="tel"
                                        error={!!errors.telephone}
                                        helperText={errors.telephone?.message}
                                        label="Телефон"
                                        id="user-telephone"
                                    />
                                )}
                            />
                        </CenteredGrid>

                        <CenteredGrid size={12}>
                            <Controller
                                name="aboutMe"
                                control={control}
                                rules={validationRules.aboutMe}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.aboutMe}
                                        helperText={errors.aboutMe?.message}
                                        label="О себе"
                                        multiline
                                        id="user-about_me"
                                        fullWidth
                                        rows={4}
                                    />
                                )}
                            />
                        </CenteredGrid>
                        <CenteredGrid size={12}>
                            <Controller
                                name="avatar"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = event.target?.files;
                                            if (file) {
                                                field.onChange(file[0]);
                                                console.log('Выбранный файл:', file[0]);
                                            }
                                        }}
                                        InputProps={{
                                            inputProps: { accept: 'image/*' },
                                        }}
                                        helperText="Выбери фото (рекомендуется фото в формате 1:1)"
                                        type="file"
                                        id="user-avatar"
                                        fullWidth
                                    />
                                )}
                            />
                        </CenteredGrid>
                        <CenteredGrid size={12}>
                            <Controller
                                name="technicalSkills"
                                control={control}
                                rules={validationRules.minTwoItems('Навыков')}
                                render={({ field }) => (
                                    <Autocomplete
                                        className={classes.autocomplete}
                                        multiple
                                        id="user-technical-skills"
                                        options={[]}
                                        value={field.value || []}
                                        freeSolo
                                        onChange={(_, newValue) => field.onChange(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option: string, index: number) => (
                                                <Chip
                                                    variant="outlined"
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    key={option}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Технические навыки"
                                                placeholder="Технические навыки"
                                                error={!!errors.technicalSkills}
                                                helperText={errors.technicalSkills?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </CenteredGrid>
                    </Grid2>
                </Paper>
            </Container>
            <Container maxWidth="sm" className={classes.sumbitCVcontainer}>
                <Button type="submit" variant="contained">
                    {'Обновить настройки'}
                </Button>
            </Container>
        </form>
    );
}

export default Settings;
