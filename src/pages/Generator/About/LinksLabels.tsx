import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
//import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { UseMUIStyles } from '@common/styles/muiStyles';
import IconButton from '@mui/material/IconButton';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
const LinkLabel = ({ control, errors, index, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown }: LabelProps) => {
    const { classes } = UseMUIStyles();
    return (
        <Paper className={classes.paperAllWidth}>
            <Grid2 container spacing={2} rowSpacing={4} className={classes.grid}>
                <CenteredGrid size={12}>
                    <IconButton onClick={onMoveUp} disabled={!canMoveUp} aria-label="Move up" color="primary">
                        <ArrowUpward />
                    </IconButton>
                    <IconButton onClick={onMoveDown} disabled={!canMoveDown} aria-label="Move down" color="primary">
                        <ArrowDownward />
                    </IconButton>
                    <IconButton onClick={onRemove} aria-label="Delete" color="primary">
                        <Delete />
                    </IconButton>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`socialLabels.${index}.name`}
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id={`user-link-name-${index}`} label={`Название Соц.Сети`} />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`socialLabels.${index}.url`}
                        control={control}
                        rules={validationRules.url}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.socialLabels?.[index]?.url}
                                helperText={errors.socialLabels?.[index]?.url?.message}
                                id={`user-link-url-${index}`}
                                label="Ссылка на Соц.Сеть"
                            />
                        )}
                    />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const LinkLabels = ({ fields, remove, move, control, errors }: LabelsProps) => {
    return (
        <>
            {/* <CenteredGrid size={12}>
                <Button variant="outlined" onClick={prepend}>
                    Добавить ссылку
                </Button>
            </CenteredGrid> */}
            {fields.map((field, index) => (
                <LinkLabel
                    control={control}
                    errors={errors}
                    key={`${field.id}-${index}`}
                    index={index}
                    onRemove={() => remove(index)}
                    onMoveUp={() => move(index, index - 1)}
                    onMoveDown={() => move(index, index + 1)}
                    canMoveUp={index > 0}
                    canMoveDown={index < fields.length - 1}
                />
            ))}
        </>
    );
};
