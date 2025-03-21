import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
//import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { UseMUIStyles } from '@common/styles/muiStyles';
import IconButton from '@mui/material/IconButton';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { memo } from 'react';
const CoursesLabel = memo(
    ({ control, errors, index, onRemove, onMoveUp, onMoveDown, canMoveUp, canMoveDown }: LabelProps) => {
        const { classes } = UseMUIStyles();
        return (
            <Paper className={classes.paperAllWidth}>
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
                            rules={validationRules.requiredField('Дата')}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-courses-dataStart-${index}`}
                                    label="Дата начало"
                                    slots={{
                                        textField: TextField,
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.courseLabels?.[index]?.dataStart,
                                            helperText: errors.courseLabels?.[index]?.dataStart?.message,
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <Controller
                            name={`courseLabels.${index}.dataEnd`}
                            control={control}
                            rules={validationRules.requiredField('Дата')}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-courses-dataEnd-${index}`}
                                    label="Дата окончания"
                                    slots={{
                                        textField: TextField,
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.courseLabels?.[index]?.dataEnd,
                                            helperText: errors.courseLabels?.[index]?.dataEnd?.message,
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
    },
);
export const CoursesLabels = ({ fields, remove, move, control, errors }: LabelsProps) => {
    return (
        <>
            {/* <CenteredGrid size={12}>
                <Button variant="outlined" onClick={prepend}>
                    {' '}
                    Добавить Курс{' '}
                </Button>
            </CenteredGrid> */}
            {fields.map((field, index) => (
                <CoursesLabel
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
