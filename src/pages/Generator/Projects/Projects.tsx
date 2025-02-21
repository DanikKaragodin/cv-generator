import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CVsectionProps } from '@common/types/Props';
import { PositionsLabels } from './ProjectLabels';

function Projects({ control, errors, fieldArray }: CVsectionProps) {
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3, marginBottom: 5 }}>
                <CardHeader title="Опыт Работы" />
                <Divider />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                    <PositionsLabels
                        fields={fieldArray.fields}
                        append={() => fieldArray.append({ name: '', projects: [] })}
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
            </Paper>
        </Container>
    );
}

export default Projects;
