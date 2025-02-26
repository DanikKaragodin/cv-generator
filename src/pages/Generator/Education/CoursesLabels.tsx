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
const CoursesLabel = ({ index, onRemove, control, errors }: LabelProps) => {
    const { classes } = MUIStyles();
    return (
        <Paper className={classes.paperAllWidth}>
            <Grid2 container className={classes.grid} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onRemove()}>
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`courseLabels.${index}.name`}
                        control={control}
                        rules={validationRules.requiredField('Курс')}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-courses-name-${index}`}
                                label="Название Курса"
                                error={!!errors.courseLabels?.[index]?.name}
                                helperText={errors.courseLabels?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <></>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`courseLabels.${index}.dataStart`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-courses-dataStart-${index}`}
                                label="Дата начало"
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`courseLabels.${index}.dataEnd`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                value={field.value ? dayjs(field.value) : null}
                                onAccept={(date) => {
                                    field.onChange(date?.format('YYYY-MM-DD') || '');
                                }}
                                data-id={`user-courses-dataEnd-${index}`}
                                label="Дата окончания"
                            />
                        )}
                    />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const CoursesLabels = ({ fields, append, remove, control, errors }: LabelsProps) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button variant="outlined" onClick={append}>
                    {' '}
                    Добавить Курс{' '}
                </Button>
            </CenteredGrid>
            {fields.map((field, index) => (
                <CoursesLabel
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
