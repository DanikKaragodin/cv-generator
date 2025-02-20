import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import { FormData } from '@common/types/Links';
const LinkLabel = ({
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
                    <Button
                        key={`user-link-button-${index}`}
                        id={`user-link-button-${index}`}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={onRemove}
                    >
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`socialLinks.${index}.name`}
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id={`user-link-name-${index}`} label={`Название Соц.Сети`} />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`socialLinks.${index}.url`}
                        control={control}
                        rules={{
                            required: 'Ссылка обязательна',
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                message: 'Некорректный URL',
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.socialLinks?.[index]?.url}
                                helperText={errors.socialLinks?.[index]?.url?.message}
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
export const LinksLabels = ({
    fields,
    append,
    remove,
    control,
    errors,
}: {
    fields: FieldArrayWithId<FormData, 'socialLinks', 'id'>[];
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
                    Добавить ссылку{' '}
                </Button>
            </CenteredGrid>
            {fields.map((field, index) => (
                <LinkLabel
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
