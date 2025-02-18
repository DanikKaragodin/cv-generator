import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { IDs } from '@common/types/IDs';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemID, removeItemID } from '@common/utils/itemIDutils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CoursesLabel = ({ id, onRemove }: { id: number; onRemove: () => void }) => {
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
                        id={`user-courses-name-${id}`}
                        label="Название Курса"
                        helperText="Incorrect entry."
                    />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <></>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <DatePicker data-id={`user-courses-dataStart-${id}`} label="Дата начало" />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <DatePicker data-id={`user-courses-dataEnd-${id}`} label="Дата окончания" />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const CoursesLabels = ({
    courses,
    setCourses,
}: {
    courses: IDs[];
    setCourses: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(courses, setCourses);
                    }}
                >
                    {' '}
                    Добавить Курс{' '}
                </Button>
            </CenteredGrid>
            {courses.map((link: IDs) => (
                <CoursesLabel
                    key={link.id}
                    id={link.id}
                    onRemove={() => {
                        removeItemID(link.id, courses, setCourses);
                    }}
                />
            ))}
        </>
    );
};
