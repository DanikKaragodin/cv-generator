import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { MUIStyles } from '@common/styles/muistyles';
const EducationLabel = ({ index, onRemove, control, errors }: LabelProps) => {
    const { classes } = MUIStyles();
    return (
        <Paper>
            <Grid2 container className={classes.grid} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                        Удалить
                    </Button>
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
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-education-dataStart-${index}`}
                                label="Дата начало"
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLabels.${index}.dataEnd`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-education-dataEnd-${index}`}
                                label="Дата окончания"
                            />
                        )}
                    />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const EducationLabels = ({ fields, append, remove, control, errors }: LabelsProps) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button variant="outlined" onClick={append}>
                    {' '}
                    Добавить Учреждение
                </Button>
            </CenteredGrid>
            {fields.map((field, index) => (
                <EducationLabel
                    control={control}
                    errors={errors}
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                />
            ))}
        </>
    );
};
