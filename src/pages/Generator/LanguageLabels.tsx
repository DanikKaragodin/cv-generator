import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { IDs } from '@common/types/IDs';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemID, removeItemID } from '@common/utils/itemIDutils';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const LanguageLabel = ({ id, onRemove }: { id: number; onRemove: () => void }) => {
    return (
        <Paper sx={{ width: '100%' }}>
            <Grid2 container sx={{ marginY: 3, paddingX: 1 }} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onRemove()}>
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField
                        error
                        required
                        id={`user-language-name-${id}`}
                        label="Название языка"
                        helperText="Incorrect entry."
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <FormControl fullWidth>
                        <InputLabel id={`user-language-select-label-${id}`}>Степень знания</InputLabel>
                        <Select
                            labelId={`user-language-select-label-${id}`}
                            id={`user-language-select-${id}`}
                            // value={age}
                            label="Степень знания"
                            // onChange={handleChange}
                        >
                            <MenuItem value={'A1'}>A1</MenuItem>
                            <MenuItem value={'A2'}>A2</MenuItem>
                            <MenuItem value={'B1'}>B1</MenuItem>
                            <MenuItem value={'B2'}>B2</MenuItem>
                            <MenuItem value={'C1'}>C1</MenuItem>
                            <MenuItem value={'C2'}>C2</MenuItem>
                        </Select>
                    </FormControl>
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};

export const LanguageLabels = ({
    languages,
    setLanguages,
}: {
    languages: IDs[];
    setLanguages: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(languages, setLanguages);
                    }}
                >
                    {' '}
                    Добавить язык{' '}
                </Button>
            </CenteredGrid>
            {languages.map((link: IDs) => (
                <LanguageLabel
                    key={link.id}
                    id={link.id}
                    onRemove={() => {
                        removeItemID(link.id, languages, setLanguages);
                    }}
                />
            ))}
        </>
    );
};
