import { EducationLabels } from './EducationLabels';
import { CoursesLabels } from './CoursesLabels';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CVsectionProps } from '@common/types/Props';
import { UseMUIStyles } from '@common/styles/muiStyles';
import { emptyLabels } from '@common/constants';

function Education({ control, errors, fieldArray, fieldArray2 }: CVsectionProps) {
    const { classes } = UseMUIStyles();
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} className={classes.paper}>
                <CardHeader title="Образование" />
                <Divider />
                <CardHeader title="Образование" />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <EducationLabels
                        fields={fieldArray.fields}
                        append={() => fieldArray.append(emptyLabels.educationLabel)}
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
                <Divider />
                <CardHeader title="Курсы" />
                {fieldArray2 !== undefined ? (
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                        <CoursesLabels
                            fields={fieldArray2.fields}
                            append={() => fieldArray2.append(emptyLabels.courseLabel)}
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
