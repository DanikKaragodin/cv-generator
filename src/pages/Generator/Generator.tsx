import { Autocomplete, Button, CardHeader, Chip, Container, Divider, Grid2, Paper, TextField } from '@mui/material';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { LinksLabels } from './LinksLabels';
import { LanguageLabels } from './LanguageLabels';
import { EducationLabels } from './EducationLabels';
import { CoursesLabels } from './CoursesLabels';
import { PositionsLabels } from './Positions&ProjectLabels';
import { FormData } from '@common/types/Links';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';

function Generator() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            telephone: '',
            aboutMe: '',
            technicalSkills: [],
            languageLinks: [],
            educationLinks: [],
            courseLinks: [],
            positionLinks: [],
        },
    });

    // интересуют параметры fields , append, remove
    const links = useFieldArray({
        control: control,
        name: 'socialLinks',
    });
    const languages = useFieldArray({
        control: control,
        name: 'languageLinks',
    });
    const educations = useFieldArray({
        control: control,
        name: 'educationLinks',
    });
    const courses = useFieldArray({
        control: control,
        name: 'courseLinks',
    });
    const positions = useFieldArray({
        control,
        name: 'positionLinks',
    });
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Собранные данные:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                    <CardHeader title="О себе" />
                    <Divider />
                    <Grid2
                        container
                        maxWidth="xs"
                        rowSpacing={4}
                        spacing={2}
                        sx={{ justifyContent: 'space-evenly', marginTop: 2, paddingX: 1 }}
                    >
                        <CenteredGrid size={6}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Имя обязательно' }}
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
                                rules={{ required: 'Фамилия обязательна' }}
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
                                rules={{ required: 'E-mail обязателен' }}
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
                                render={({ field }) => <TextField {...field} label="Телефон" id="user-telephone" />}
                            />
                        </CenteredGrid>

                        <CenteredGrid size={11}>
                            <Controller
                                name="aboutMe"
                                control={control}
                                rules={{ required: "Поле 'О себе' обязательно" }}
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
                                        sx={{ width: '100%' }}
                                    />
                                )}
                            />
                        </CenteredGrid>

                        <LinksLabels
                            fields={links.fields}
                            append={() => links.append({ name: '', url: '' })}
                            remove={links.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                    <CardHeader title="Основные Навыки" />
                    <Divider />
                    <CardHeader title="Знание языков" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <LanguageLabels
                            fields={languages.fields}
                            append={() => languages.append({ name: '', degree: '' })}
                            remove={languages.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                    <Divider />
                    <CardHeader title="Технические навыки" />
                    <Controller
                        name="technicalSkills"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                sx={{ paddingX: 1 }}
                                multiple
                                id="user-technical-skills"
                                options={[]}
                                value={field.value || []}
                                freeSolo
                                onChange={(_, newValue) => field.onChange(newValue)} // такой формат для добавления тегов в массив
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
                                    />
                                )}
                            />
                        )}
                    />
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                    <CardHeader title="Образование" />
                    <Divider />
                    <CardHeader title="Образование" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <EducationLabels
                            fields={educations.fields}
                            append={() =>
                                educations.append({
                                    name: '',
                                    faculty: '',
                                    specialization: '',
                                    degree: '',
                                    dataStart: '',
                                    dataEnd: '',
                                })
                            }
                            remove={educations.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                    <Divider />
                    <CardHeader title="Курсы" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <CoursesLabels
                            fields={courses.fields}
                            append={() => courses.append({ name: '', dataStart: '', dataEnd: '' })}
                            remove={courses.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3, marginBottom: 5 }}>
                    <CardHeader title="Опыт Работы" />
                    <Divider />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <PositionsLabels
                            fields={positions.fields}
                            append={() => positions.append({ name: '', projects: [] })}
                            remove={positions.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Button type="submit" variant="outlined">
                    Собрать резюме
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
