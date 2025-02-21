import { EducationLabels } from './EducationLabels';
import { CoursesLabels } from './CoursesLabels';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CVsectionProps } from '@common/types/Props';

function Education({ control, errors, fieldArray, fieldArray2 }: CVsectionProps) {
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                <CardHeader title="Образование" />
                <Divider />
                <CardHeader title="Образование" />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                    <EducationLabels
                        fields={fieldArray.fields}
                        append={() =>
                            fieldArray.append({
                                name: '',
                                faculty: '',
                                specialization: '',
                                degree: '',
                                dataStart: '',
                                dataEnd: '',
                            })
                        }
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
                <Divider />
                <CardHeader title="Курсы" />
                {fieldArray2 !== undefined ? (
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                        <CoursesLabels
                            fields={fieldArray2.fields}
                            append={() => fieldArray2.append({ name: '', dataStart: '', dataEnd: '' })}
                            remove={fieldArray2.remove}
                            control={control}
                            errors={errors}
                        />
                    </Grid2>
                ) : (
                    <CardHeader title="Ошибка"></CardHeader>
                )}
            </Paper>
        </Container>
    );
}

export default Education;
