import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
//import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import _Select from '@common/components/Select/_Select';
import { Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { languageDegrees } from '@common/constants';
import { LabelProps, LabelsProps } from '@common/types/Props';
import { validationRules } from '@common/validation';
import { UseMUIStyles } from '@common/styles/muiStyles';
const LanguageLabel = ({
    control,
    errors,
    index,
    onRemove,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
}: LabelProps) => {
    const { classes } = UseMUIStyles();
    return (
        <Paper className={classes.paperAllWidth}>
            <Grid2 container className={classes.grid} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <IconButton onClick={onMoveUp} disabled={!canMoveUp} aria-label="Move up" color="primary">
                        <ArrowUpward />
                    </IconButton>
                    <IconButton onClick={onMoveDown} disabled={!canMoveDown} aria-label="Move down" color="primary">
                        <ArrowDownward />
                    </IconButton>
                    <IconButton onClick={onRemove} aria-label="Delete" color="primary">
                        <Delete />
                    </IconButton>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <Controller
                        name={`languageLabels.${index}.name`}
                        control={control}
                        rules={validationRules.requiredField('Язык')}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`user-language-name-${index}`}
                                label={`Название языка`}
                                error={!!errors.languageLabels?.[index]?.name}
                                helperText={errors.languageLabels?.[index]?.name?.message}
                            />
                        )}
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <FormControl className={classes.autocomplete} error={!!errors.languageLabels?.[index]?.degree}>
                        <Controller
                            name={`languageLabels.${index}.degree`}
                            control={control}
                            rules={validationRules.requiredField('Степень')}
                            render={({ field }) => (
                                <>
                                    <InputLabel id={`user-language-select-label-${index}`}>Степень знания</InputLabel>
                                    <_Select
                                        field={field}
                                        labelId={`user-language-select-label-${index}`}
                                        id={`user-language-select-${index}`}
                                        label="Степень знания"
                                        menuItems={languageDegrees}
                                    ></_Select>
                                    <FormHelperText>{errors.languageLabels?.[index]?.degree?.message}</FormHelperText>
                                </>
                            )}
                        />
                    </FormControl>
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};

export const LanguageLabels = ({ fields, remove, move, control, errors }: LabelsProps) => {
    return (
        <>
            {/* <CenteredGrid size={12}>
                <Button variant="outlined" onClick={prepend} >
                    {' '}
                    Добавить язык{' '}
                </Button>
            </CenteredGrid> */}
            {fields.map((field, index) => (
                <LanguageLabel
                    control={control}
                    errors={errors}
                    key={`${field.id}-${index}`}
                    index={index}
                    onRemove={() => remove(index)}
                    onMoveUp={() => move(index, index - 1)}
                    onMoveDown={() => move(index, index + 1)}
                    canMoveUp={index > 0}
                    canMoveDown={index < fields.length - 1}
                />
            ))}
        </>
    );
};
