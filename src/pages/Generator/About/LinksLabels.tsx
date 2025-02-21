import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from 'react-hook-form';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
const LinkLabel = ({ index, onRemove, control, errors }: LabelProps) => {
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
                        name={`socialLabels.${index}.name`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                id={`user-link-name-${index}`}
                                label={`Название Соц.Сети`}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`socialLabels.${index}.url`}
                        control={control}
                        rules={validationRules.url}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                sx={{ width: '95%' }}
                                error={!!errors.socialLabels?.[index]?.url}
                                helperText={errors.socialLabels?.[index]?.url?.message}
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
export const LinkLabels = ({ fields, append, remove, control, errors }: LabelsProps) => {
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
