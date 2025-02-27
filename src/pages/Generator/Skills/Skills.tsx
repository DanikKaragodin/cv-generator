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
import { UseMUIStyles } from '@common/styles/muiStyles';
import { emptyLabels } from '@common/constants';
function Skills({ control, errors, fieldArray }: CVsectionProps) {
    const { classes } = UseMUIStyles();
    return (
        <Container maxWidth="sm">
            <Paper elevation={4} className={classes.paper}>
                <CardHeader title="Основные Навыки" />
                <Divider />
                <CardHeader title="Знание языков" />
                <Grid2 container maxWidth="xs" rowSpacing={4} spacing={2} className={classes.grid}>
                    <LanguageLabels
                        fields={fieldArray.fields}
                        append={() => fieldArray.append(emptyLabels.languageLabel)}
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
                                className={classes.autocomplete}
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
