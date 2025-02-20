import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormData } from '@common/types/Links';
import { Control, Controller, FieldArrayWithId, FieldErrors, useFieldArray } from 'react-hook-form';
import dayjs from 'dayjs';

const ProjectLabel = ({
    control,
    positionIndex,
    projectIndex,
    onRemove,
    errors,
}: {
    control: Control<FormData>;
    positionIndex: number;
    projectIndex: number;
    onRemove: () => void;
    errors: FieldErrors<FormData>;
}) => {
    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Grid2 container sx={{ marginY: 3, paddingX: 1, justifyContent: 'center' }} spacing={2} rowSpacing={4}>
                    <CenteredGrid size={12}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                            Удалить
                        </Button>
                    </CenteredGrid>
                    <CenteredGrid size={11}>
                        <Controller
                            name={`positionLinks.${positionIndex}.projects.${projectIndex}.description`}
                            control={control}
                            rules={{
                                maxLength: {
                                    value: 500,
                                    message: 'Максимум 500 символов',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    id={`user-project-text-${positionIndex}-${projectIndex}`}
                                    rows={4}
                                    error={
                                        !!errors.positionLinks?.[positionIndex]?.projects?.[projectIndex]?.description
                                    }
                                    helperText={
                                        errors.positionLinks?.[positionIndex]?.projects?.[projectIndex]?.description
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
                            name={`positionLinks.${positionIndex}.projects.${projectIndex}.tasks`}
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    sx={{ paddingX: 1, width: '100%' }}
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
                            name={`positionLinks.${positionIndex}.projects.${projectIndex}.stack`}
                            control={control}
                            rules={{
                                required: 'Необходимо от 2 технологий',
                                validate: (value) => {
                                    if (value.length < 2) return 'Необходимо от 2 технологий';
                                },
                            }}
                            render={({ field }) => (
                                <Autocomplete
                                    sx={{ paddingX: 1, width: '100%' }}
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
                                                !!errors.positionLinks?.[positionIndex]?.projects?.[projectIndex]?.stack
                                            }
                                            helperText={
                                                errors.positionLinks?.[positionIndex]?.projects?.[projectIndex]?.stack
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
                            name={`positionLinks.${positionIndex}.projects.${projectIndex}.dataStart`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
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
                            name={`positionLinks.${positionIndex}.projects.${projectIndex}.dataEnd`}
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
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

const PositionsLabel = ({
    control,
    positionIndex,
    onRemove,
    errors,
}: {
    control: Control<FormData>;
    positionIndex: number;
    onRemove: () => void;
    errors: FieldErrors<FormData>;
}) => {
    const projects = useFieldArray({
        control: control,
        name: `positionLinks.${positionIndex}.projects`,
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
                            name={`positionLinks.${positionIndex}.name`}
                            control={control}
                            rules={{
                                required: 'Название Позиции обязательно',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id={`user-position-name-${positionIndex}`}
                                    label="Позиция"
                                    error={!!errors.positionLinks?.[positionIndex]?.name}
                                    helperText={errors.positionLinks?.[positionIndex]?.name?.message}
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
                            positionIndex={positionIndex}
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

export const PositionsLabels = ({
    fields,
    append,
    remove,
    control,
    errors,
}: {
    fields: FieldArrayWithId<FormData, 'positionLinks', 'id'>[];
    append: () => void;
    remove: (index?: number | number[]) => void;
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}) => {
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
                    positionIndex={positionIndex}
                    onRemove={() => remove(positionIndex)}
                    errors={errors}
                />
            ))}
        </>
    );
};
