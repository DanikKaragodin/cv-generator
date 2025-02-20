import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { FormData } from '@common/types/Links';
const LanguageLabel = ({
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
                    <Button
                        key={`user-language-button-${index}`}
                        id={`user-language-button-${index}`}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={onRemove}
                    >
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`languageLinks.${index}.name`}
                        control={control}
                        rules={{
                            required: 'Название языка обязательно',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-language-name-${index}`}
                                label={`Название языка`}
                                error={!!errors.languageLinks?.[index]?.name}
                                helperText={errors.languageLinks?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <FormControl fullWidth error={!!errors.languageLinks?.[index]?.degree}>
                        <Controller
                            name={`languageLinks.${index}.degree`}
                            control={control}
                            rules={{
                                required: 'Степень обязательна',
                            }}
                            render={({ field }) => (
                                <>
                                    <InputLabel id={`user-language-select-label-${index}`}>Степень знания</InputLabel>
                                    <Select
                                        {...field}
                                        labelId={`user-language-select-label-${index}`}
                                        id={`user-language-select-${index}`}
                                        label="Степень знания"
                                    >
                                        <MenuItem value={'A1'}>A1</MenuItem>
                                        <MenuItem value={'A2'}>A2</MenuItem>
                                        <MenuItem value={'B1'}>B1</MenuItem>
                                        <MenuItem value={'B2'}>B2</MenuItem>
                                        <MenuItem value={'C1'}>C1</MenuItem>
                                        <MenuItem value={'C2'}>C2</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.languageLinks?.[index]?.degree?.message}</FormHelperText>
                                </>
                            )}
                        />
                    </FormControl>
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};

export const LanguageLabels = ({
    fields,
    append,
    remove,
    control,
    errors,
}: {
    fields: FieldArrayWithId<FormData, 'languageLinks', 'id'>[];
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
                    Добавить язык{' '}
                </Button>
            </CenteredGrid>
            {fields.map((field, index) => (
                <LanguageLabel
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
