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
import { UseMUIStyles } from '@common/styles/muiStyles';
import { emptyLabels } from '@common/constants';
import Avatar from '@common/components/Avatar/Avatar';
import AddButton from '@common/components/AddButton/AddButton';
function About({ control, errors, fieldArray }: CVsectionProps) {
    const { classes } = UseMUIStyles();
    return (
        <Container maxWidth="md">
            <Paper elevation={4} className={classes.paper}>
                <CardHeader title="Название резюме" />
                <Divider />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <CenteredGrid size={6}>
                        <Controller
                            name="CVname"
                            control={control}
                            rules={validationRules.requiredField('Название Резюме')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors.CVname}
                                    helperText={errors.CVname?.message}
                                    required
                                    id="cv-name"
                                    label="Название Резюме"
                                />
                            )}
                        />
                    </CenteredGrid>
                </Grid2>
                <Divider />
                <CardHeader title="О себе" />
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
                            rules={{ ...validationRules.email, ...validationRules.requiredField('E-mail') }}
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
                            rules={{ ...validationRules.aboutMe, ...validationRules.requiredField('О себе') }}
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
                </Grid2>
                <Divider />
                <CardHeader
                    title="Социальные сети"
                    action={
                        <AddButton
                            fieldArray={fieldArray}
                            ariaLabel="Добавить соц.сеть"
                            emptyLabel={emptyLabels.linkLabel}
                        />
                    }
                />
                <Grid2 container rowSpacing={4} spacing={2} className={classes.grid}>
                    <LinkLabels
                        fields={fieldArray.fields}
                        prepend={() => fieldArray.prepend(emptyLabels.linkLabel)}
                        remove={fieldArray.remove}
                        move={fieldArray.move}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
            </Paper>
        </Container>
    );
}

export default About;
