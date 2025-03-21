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
import AddButton from '@common/components/AddButton/AddButton';

function Education({ control, errors, fieldArray, fieldArray2 }: CVsectionProps) {
    const { classes } = UseMUIStyles();
    return (
        <Container maxWidth="md">
            <Paper elevation={4} className={classes.paper}>
                <CardHeader title="Образование" />
                <Divider />
                <CardHeader
                    title="Учреждения"
                    action={
                        <AddButton
                            fieldArray={fieldArray}
                            ariaLabel="Добавить учреждение"
                            emptyLabel={emptyLabels.educationLabel}
                        />
                    }
                />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <EducationLabels
                        fields={fieldArray.fields}
                        prepend={() => fieldArray.prepend(emptyLabels.educationLabel)}
                        remove={fieldArray.remove}
                        move={fieldArray.move}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
                <Divider />
                <CardHeader
                    title="Курсы"
                    action={
                        <AddButton
                            fieldArray={fieldArray2 ? fieldArray2 : fieldArray}
                            ariaLabel="Добавить Курс"
                            emptyLabel={emptyLabels.courseLabel}
                        />
                    }
                />
                {fieldArray2 !== undefined ? (
                    <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                        <CoursesLabels
                            fields={fieldArray2.fields}
                            prepend={() => fieldArray2.prepend(emptyLabels.courseLabel)}
                            remove={fieldArray2.remove}
                            move={fieldArray2.move}
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
