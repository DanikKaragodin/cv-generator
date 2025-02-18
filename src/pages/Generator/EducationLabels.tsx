import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { IDs } from '@common/types/IDs';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemID, removeItemID } from '@common/utils/itemIDutils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EducationLabel = ({ id, onRemove }: { id: number; onRemove: () => void }) => {
    return (
        <Paper>
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
                        id={`user-education-name-${id}`}
                        label="Название УЗ"
                        helperText="Incorrect entry."
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField id={`user-education-faculty-${id}`} label="Факультет" />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField id={`user-education-specialization-${id}`} label="Специальность" />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField id={`user-education-degree-${id}`} label="Степень" />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <DatePicker data-id={`user-education-dataStart-${id}`} label="Дата начало" />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <DatePicker data-id={`user-education-dataEnd-${id}`} label="Дата окончания" />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const EducationLabels = ({
    educations,
    setEducations,
}: {
    educations: IDs[];
    setEducations: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(educations, setEducations);
                    }}
                >
                    {' '}
                    Добавить Учреждение
                </Button>
            </CenteredGrid>
            {educations.map((link: IDs) => (
                <EducationLabel
                    key={link.id}
                    id={link.id}
                    onRemove={() => {
                        removeItemID(link.id, educations, setEducations);
                    }}
                />
            ))}
        </>
    );
};
