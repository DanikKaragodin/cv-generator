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
const EducationLabel = ({
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
        <Paper>
            <Grid2 container sx={{ marginY: 3, paddingX: 1 }} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onRemove}>
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLinks.${index}.name`}
                        control={control}
                        rules={{
                            required: 'Название УЗ обязательно',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-education-name-${index}`}
                                label="Название УЗ"
                                error={!!errors.educationLinks?.[index]?.name}
                                helperText={errors.educationLinks?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLinks.${index}.faculty`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-education-faculty-${index}`}
                                label="Факультет"
                                error={!!errors.educationLinks?.[index]?.faculty}
                                helperText={errors.educationLinks?.[index]?.faculty?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLinks.${index}.specialization`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-education-specialization-${index}`}
                                label="Специальность"
                                error={!!errors.educationLinks?.[index]?.specialization}
                                helperText={errors.educationLinks?.[index]?.specialization?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLinks.${index}.degree`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-education-degree-${index}`}
                                label="Степень"
                                error={!!errors.educationLinks?.[index]?.degree}
                                helperText={errors.educationLinks?.[index]?.degree?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`educationLinks.${index}.dataStart`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                sx={{ width: '95%' }}
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
                        name={`educationLinks.${index}.dataEnd`}
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                sx={{ width: '95%' }}
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
export const EducationLabels = ({
    fields,
    append,
    remove,
    control,
    errors,
}: {
    fields: FieldArrayWithId<FormData, 'educationLinks', 'id'>[];
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
