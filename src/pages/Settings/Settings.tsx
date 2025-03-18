import { defaultState, TEST_IDS } from '@common/constants';
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
import { useEffect, useState } from 'react';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { validationRules } from '@common/validation';
import Avatar from '@common/components/Avatar/Avatar';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import Loading from '@common/components/Alerts/Loading';

function Settings() {
    const { userID } = UserAuth();
    const { insertDefaultsbyUserID, selectDefaultsbyUserID } = UserSupabase();
    const { classes } = UseMUIStyles();
    const [isLoad, setLoad] = useState<boolean | null>(true);
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
        if (userID) {
            const result = await insertDefaultsbyUserID(userID, inputData);
            if (result.success) console.log('good!');
        }
    };

    useEffect(() => {
        const loadDefaultsData = async () => {
            if (userID) {
                const { success, data } = await selectDefaultsbyUserID(userID);
                console.log(success, data);
                if (success && data) reset(data);
            } else {
                reset(defaultState);
            }
            setLoad(false);
        };

        loadDefaultsData();
    }, [userID, isLoad]);
    if (isLoad) return <Loading />;
    return (
        !isLoad && (
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
                            <Avatar control={control} />
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
        )
    );
}

export default Settings;
