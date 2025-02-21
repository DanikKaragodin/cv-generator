import { LanguageLabels } from './LanguageLabels';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { CVsectionProps } from '@common/types/Props';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { validationRules } from '@common/validation';
function Skills({ control, errors, fieldArray }: CVsectionProps) {
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ marginTop: 5, paddingBottom: 3 }}>
                <CardHeader title="Основные Навыки" />
                <Divider />
                <CardHeader title="Знание языков" />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} sx={{ marginY: 2, paddingX: 1 }}>
                    <LanguageLabels
                        fields={fieldArray.fields}
                        append={() => fieldArray.append({ name: '', degree: '' })}
                        remove={fieldArray.remove}
                        control={control}
                        errors={errors}
                    />
                </Grid2>
                <Divider />
                <CardHeader title="Технические навыки" />
                <CenteredGrid size={12}>
                    <Controller
                        name="technicalSkills"
                        control={control}
                        rules={validationRules.minTwoItems('Навыков')}
                        render={({ field }) => (
                            <Autocomplete
                                sx={{ paddingX: 0, width: '95%' }}
                                multiple
                                id="user-technical-skills"
                                options={[]}
                                value={field.value || []}
                                freeSolo
                                onChange={(_, newValue) => field.onChange(newValue)} // такой формат для добавления тегов в массив
                                renderTags={(value, getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                            key={option}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Технические навыки"
                                        placeholder="Технические навыки"
                                        error={!!errors.technicalSkills}
                                        helperText={errors.technicalSkills?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </CenteredGrid>
            </Paper>
        </Container>
    );
}

export default Skills;
