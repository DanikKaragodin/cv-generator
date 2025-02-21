import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';
import { LabelProps, LabelsProps, ProjectLabelProps } from '@common/types/Props';
import { validationRules } from '@common/validation';

const ProjectLabel = ({ control, positionIndex, projectIndex, onRemove, errors }: ProjectLabelProps) => {
    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Grid2 container sx={{ marginY: 3, paddingX: 1, justifyContent: 'center' }} spacing={2} rowSpacing={4}>
                    <CenteredGrid size={12}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                            Удалить
                        </Button>
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${positionIndex}.projects.${projectIndex}.description`}
                            control={control}
                            rules={validationRules.maxLength500}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    sx={{ width: '95%' }}
                                    multiline
                                    id={`user-project-text-${positionIndex}-${projectIndex}`}
                                    rows={4}
                                    error={
                                        !!errors.positionLabels?.[positionIndex]?.projects?.[projectIndex]?.description
                                    }
                                    helperText={
                                        errors.positionLabels?.[positionIndex]?.projects?.[projectIndex]?.description
                                            ?.message
                                    }
                                    label="Описание проекта"
                                    fullWidth
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Controller
                            name={`positionLabels.${positionIndex}.projects.${projectIndex}.tasks`}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    sx={{ paddingX: 0, width: '95%' }}
                                    multiple
                                    freeSolo
                                    id={`user-project-tags-tasks-${positionIndex}-${projectIndex}`}
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
                            name={`positionLabels.${positionIndex}.projects.${projectIndex}.stack`}
                            control={control}
                            rules={validationRules.minTwoItems('Технологий')}
                            render={({ field }) => (
                                <Autocomplete
                                    sx={{ paddingX: 0, width: '95%' }}
                                    multiple
                                    freeSolo
                                    id={`user-project-tags-stack-${positionIndex}-${projectIndex}`}
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
                                            error={
                                                !!errors.positionLabels?.[positionIndex]?.projects?.[projectIndex]
                                                    ?.stack
                                            }
                                            helperText={
                                                errors.positionLabels?.[positionIndex]?.projects?.[projectIndex]?.stack
                                                    ?.message
                                            }
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
                            name={`positionLabels.${positionIndex}.projects.${projectIndex}.dataStart`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    sx={{ width: '95%' }}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-project-dataStart-${positionIndex}-${projectIndex}`}
                                    label="Дата начало"
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <Controller
                            name={`positionLabels.${positionIndex}.projects.${projectIndex}.dataEnd`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    sx={{ width: '95%' }}
                                    value={field.value ? dayjs(field.value) : null}
                                    onAccept={(date) => {
                                        field.onChange(date?.format('YYYY-MM-DD') || '');
                                    }}
                                    data-id={`user-project-dataEnd-${positionIndex}-${projectIndex}`}
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

const PositionsLabel = ({ control, index, onRemove, errors }: LabelProps) => {
    const projects = useFieldArray({
        control: control,
        name: `positionLabels.${index}.projects`,
    });
    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Grid2 container sx={{ marginY: 3, paddingX: 1 }} spacing={2} rowSpacing={4}>
                    <CenteredGrid size={12}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                            Удалить
                        </Button>
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <Controller
                            name={`positionLabels.${index}.name`}
                            control={control}
                            rules={validationRules.requiredField('Позиция')}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    sx={{ width: '95%' }}
                                    id={`user-position-name-${index}`}
                                    label="Позиция"
                                    error={!!errors.positionLabels?.[index]?.name}
                                    helperText={errors.positionLabels?.[index]?.name?.message}
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                projects.append({
                                    description: '',
                                    tasks: [],
                                    stack: [],
                                    dataStart: '',
                                    dataEnd: '',
                                })
                            }
                        >
                            Добавить Проект
                        </Button>
                    </CenteredGrid>
                    {projects.fields.map((project, projectIndex) => (
                        <ProjectLabel
                            key={project.id}
                            control={control}
                            positionIndex={index}
                            projectIndex={projectIndex}
                            onRemove={() => projects.remove(projectIndex)}
                            errors={errors}
                        />
                    ))}
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
                    {' '}
                    Добавить Позицию{' '}
                </Button>
            </CenteredGrid>
            {fields.map((position, positionIndex) => (
                <PositionsLabel
                    key={position.id}
                    control={control}
                    index={positionIndex}
                    onRemove={() => remove(positionIndex)}
                    errors={errors}
                />
            ))}
        </>
    );
};
