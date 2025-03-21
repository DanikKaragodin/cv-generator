import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
//import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { UseMUIStyles } from '@common/styles/muiStyles';
const EducationLabel = ({
    control,
    errors,
    index,
    onRemove,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
}: LabelProps) => {
    const { classes } = UseMUIStyles();
    return (
        <Paper>
            <Grid2 container className={classes.grid} spacing={2} rowSpacing={4}>
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
                        name={`educationLabels.${index}.name`}
                        control={control}
                        rules={validationRules.requiredField('УЗ')}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-education-name-${index}`}
                                label="Название УЗ"
                                error={!!errors.educationLabels?.[index]?.name}
                                helperText={errors.educationLabels?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.faculty`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-education-faculty-${index}`}
                                label="Факультет"
                                error={!!errors.educationLabels?.[index]?.faculty}
                                helperText={errors.educationLabels?.[index]?.faculty?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.specialization`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-education-specialization-${index}`}
                                label="Специальность"
                                error={!!errors.educationLabels?.[index]?.specialization}
                                helperText={errors.educationLabels?.[index]?.specialization?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.degree`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-education-degree-${index}`}
                                label="Степень"
                                error={!!errors.educationLabels?.[index]?.degree}
                                helperText={errors.educationLabels?.[index]?.degree?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.dataStart`}
                        control={control}
                        rules={validationRules.requiredField('Дата')}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-education-dataStart-${index}`}
                                label="Дата начало"
                                slots={{
                                    textField: TextField,
                                }}
                                slotProps={{
                                    textField: {
                                        error: !!errors.educationLabels?.[index]?.dataStart,
                                        helperText: errors.educationLabels?.[index]?.dataStart?.message,
                                        fullWidth: true,
                                    },
                                }}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.dataEnd`}
                        control={control}
                        rules={validationRules.requiredField('Дата')}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-education-dataEnd-${index}`}
                                label="Дата окончания"
                                slots={{
                                    textField: TextField,
                                }}
                                slotProps={{
                                    textField: {
                                        error: !!errors.educationLabels?.[index]?.dataEnd,
                                        helperText: errors.educationLabels?.[index]?.dataEnd?.message,
                                        fullWidth: true,
                                    },
                                }}
                            />
                        )}
                    />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const EducationLabels = ({ fields, remove, move, control, errors }: LabelsProps) => {
    return (
        <>
            {/* <CenteredGrid size={12}>
                <Button variant="outlined" onClick={prepend}>
                    {' '}
                    Добавить Учреждение
                </Button>
            </CenteredGrid> */}
            {fields.map((field, index) => (
                <EducationLabel
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
