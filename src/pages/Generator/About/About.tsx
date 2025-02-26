import { LinkLabels } from './LinksLabels';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { CVsectionProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { MUIStyles } from '@common/styles/muistyles';
import { emptyLabels } from '@common/constants';
function About({ control, errors, fieldArray }: CVsectionProps) {
    const { classes } = MUIStyles();
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} className={classes.paper}>
                <CardHeader title="О себе" />
                <Divider />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <CenteredGrid size={6}>
                        <Controller
                            name="name"
                            control={control}
                            rules={validationRules.requiredField('Имя')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    required
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
                            rules={validationRules.requiredField('Фамилия')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    label="Фамилия"
                                    required
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
                                    required
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
                    <LinkLabels
                        fields={fieldArray.fields}
                        append={() => fieldArray.append(emptyLabels.linkLabel)}
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
            </Paper>
        </Container>
    );
}

export default About;
