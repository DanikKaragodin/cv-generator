import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CVsectionProps } from '@common/types/Props';
import { PositionsLabels } from './PositionsLabels';
import { MUIStyles } from '@common/styles/muistyles';

function Positions({ control, errors, fieldArray }: CVsectionProps) {
    const { classes, cx } = MUIStyles();
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} className={cx(classes.paper)} sx={{ marginBottom: 5 }}>
                <CardHeader title="Опыт Работы" />
                <Divider />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={cx(classes.grid)}>
                    <PositionsLabels
                        fields={fieldArray.fields}
                        append={() =>
                            fieldArray.append({
                                name: '',
                                description: '',
                                tasks: [],
                                stack: [],
                                dataStart: '',
                                dataEnd: '',
                            })
                        }
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
            </Paper>
        </Container>
    );
}

export default Positions;
