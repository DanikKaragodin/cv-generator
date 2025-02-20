import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, FieldArrayWithId, FieldErrors } from 'node_modules/react-hook-form/dist/types';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormData } from '@common/types/Links';
const CoursesLabel = ({
    index,
    onRemove,
    control,
    errors,
}: {
    index: number;
    onRemove: () => void;
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
}) => {
    return (
        <Paper sx={{ width: '100%' }}>
            <Grid2 container sx={{ marginY: 3, paddingX: 1 }} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onRemove()}>
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`courseLinks.${index}.name`}
                        control={control}
                        rules={{
                            required: 'Название Курса обязательно',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-courses-name-${index}`}
                                label="Название Курса"
                                error={!!errors.courseLinks?.[index]?.name}
                                helperText={errors.courseLinks?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <></>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`courseLinks.${index}.dataStart`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                sx={{ width: '95%' }}
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
                        name={`courseLinks.${index}.dataEnd`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                sx={{ width: '95%' }}
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
export const CoursesLabels = ({
    fields,
    append,
    remove,
    control,
    errors,
}: {
    fields: FieldArrayWithId<FormData, 'courseLinks', 'id'>[];
    append: () => void;
    remove: (index: number) => void;
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
}) => {
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
