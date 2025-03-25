import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CVsectionProps } from '@common/types/Props';
import { PositionsLabels } from './PositionsLabels';
import { UseMUIStyles } from '@common/styles/muiStyles';
import { emptyLabels } from '@common/constants';
import AddButton from '@common/components/AddButton/AddButton';

function Positions({ control, errors, fieldArray }: CVsectionProps) {
    const { classes } = UseMUIStyles();
    return (
        <Container maxWidth="md">
            <Paper elevation={4} className={classes.paper} sx={{ marginBottom: 5 }}>
                <CardHeader
                    title="Опыт Работы"
                    action={
                        <AddButton
                            fieldArray={fieldArray}
                            ariaLabel="Добавить опыт работы"
                            emptyLabel={emptyLabels.positionLabel}
                        />
                    }
                />
                <Divider />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <PositionsLabels
                        fields={fieldArray.fields}
                        prepend={() => fieldArray.prepend(emptyLabels.positionLabel)}
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

export default Positions;
