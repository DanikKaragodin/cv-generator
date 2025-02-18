import { Autocomplete, Button, CardHeader, Chip, Container, Divider, Grid2, Paper, TextField } from '@mui/material';
import './Generator.css';
import { useState } from 'react';
import { IDs } from '@common/types/IDs';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { LinksLabels } from './LinksLabels';
import { LanguageLabels } from './LanguageLabels';
import { EducationLabels } from './EducationLabels';
import { CoursesLabels } from './CoursesLabels';
import { PositionsLabels } from './Positions&ProjectLabels';

function Generator() {
    const [positions, setPositions] = useState<IDs[]>([]);
    // const [projects, setProjects] = useState<IDs[]>([]);
    const [courses, setCourses] = useState<IDs[]>([]);
    const [education, setEducation] = useState<IDs[]>([]);
    const [language, setLanguage] = useState<IDs[]>([]);
    const [links, setLinks] = useState<IDs[]>([]);

    return (
        <>
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
                            <TextField error required id="user-name" label="Имя" helperText="Incorrect entry." />
                        </CenteredGrid>
                        <CenteredGrid size={6}>
                            <TextField
                                error
                                required
                                id="user-last_name"
                                label="Фамилия"
                                helperText="Incorrect entry."
                            />
                        </CenteredGrid>
                        <CenteredGrid size={6}>
                            <TextField error required id="user-email" label="E-mail" />
                        </CenteredGrid>
                        <CenteredGrid size={6}>
                            <TextField id="user-telephone" label="Телефон" />
                        </CenteredGrid>
                        <CenteredGrid size={11}>
                            <TextField multiline id="user-about_me" label="О себе" rows={4} sx={{ width: '100%' }} />
                        </CenteredGrid>
                        <LinksLabels links={links} setLinks={setLinks} />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                    <CardHeader title="Основные Навыки" />
                    <Divider />
                    <CardHeader title="Знание языков" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <LanguageLabels languages={language} setLanguages={setLanguage} />
                    </Grid2>
                    <Divider />
                    <CardHeader title="Технические навыки" />
                    <Autocomplete
                        sx={{ paddingX: 1 }}
                        multiple
                        id="user-technical-skills"
                        options={[].map((option) => option)}
                        defaultValue={['Samara']}
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
                            })
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
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                    <CardHeader title="Образование" />
                    <Divider />
                    <CardHeader title="Образование" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <EducationLabels educations={education} setEducations={setEducation} />
                    </Grid2>
                    <Divider />
                    <CardHeader title="Курсы" />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <CoursesLabels courses={courses} setCourses={setCourses} />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm">
                <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3, marginBottom: 5 }}>
                    <CardHeader title="Опыт Работы" />
                    <Divider />
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <PositionsLabels positions={positions} setPositions={setPositions} />
                    </Grid2>
                </Paper>
            </Container>

            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Button variant="outlined"> Собрать резюме </Button>
            </Container>
        </>
    );
}

export default Generator;
