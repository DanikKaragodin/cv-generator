import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { UseMUIStyles } from '@common/styles/muiStyles';

const PositionsLabel = ({ control, index, onRemove, errors }: LabelProps) => {
    const { classes } = UseMUIStyles();
    return (
        <>
            <Paper className={classes.paperAllWidth}>
                <Grid2 container className={classes.grid} spacing={2} rowSpacing={4}>
                    <CenteredGrid size={12}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                            Удалить
                        </Button>
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${index}.name`}
                            control={control}
                            rules={validationRules.requiredField('Позиция')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id={`user-position-name-${index}`}
                                    label="Позиция"
                                    error={!!errors.positionLabels?.[index]?.name}
                                    helperText={errors.positionLabels?.[index]?.name?.message}
                                />
                            )}
                        />
                    </CenteredGrid>

                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${index}.description`}
                            control={control}
                            rules={validationRules.maxLength500}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    id={`user-project-text-${index}-${index}`}
                                    rows={4}
                                    error={!!errors.positionLabels?.[index]?.description}
                                    helperText={errors.positionLabels?.[index]?.description?.message}
                                    label="Описание проекта"
                                    fullWidth
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${index}.tasks`}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    className={classes.autocomplete}
                                    multiple
                                    freeSolo
                                    id={`user-project-tags-tasks-${index}`}
                                    options={[]}
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip label={option} {...getTagProps({ index })} key={index} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Выполняемые задачи"
                                            placeholder="Добавить задачу"
                                        />
                                    )}
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${index}.stack`}
                            control={control}
                            rules={validationRules.minTwoItems('Технологий')}
                            render={({ field }) => (
                                <Autocomplete
                                    className={classes.autocomplete}
                                    multiple
                                    freeSolo
                                    id={`user-project-tags-stack-${index}`}
                                    options={[]}
                                    value={field.value}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip label={option} {...getTagProps({ index })} key={index} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={!!errors.positionLabels?.[index]?.stack}
                                            helperText={errors.positionLabels?.[index]?.message}
                                            variant="outlined"
                                            label="Стек Технологий"
                                            placeholder="Стек Технологий"
                                        />
                                    )}
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <Controller
                            name={`positionLabels.${index}.dataStart`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-project-dataStart-${index}-${index}`}
                                    label="Дата начало"
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <Controller
                            name={`positionLabels.${index}.dataEnd`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-project-dataEnd-${index}-${index}`}
                                    label="Дата окончания"
                                />
                            )}
                        />
                    </CenteredGrid>
                </Grid2>
            </Paper>
        </>
    );
};

export const PositionsLabels = ({ fields, append, remove, control, errors }: LabelsProps) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button variant="outlined" onClick={append}>
                    Добавить Позицию
                </Button>
            </CenteredGrid>
            {fields.map((position, index) => (
                <PositionsLabel
                    key={position.id}
                    control={control}
                    index={index}
                    onRemove={() => remove(index)}
                    errors={errors}
                />
            ))}
        </>
    );
};
