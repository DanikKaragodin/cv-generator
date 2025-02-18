import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { IDs } from '@common/types/IDs';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemID, removeItemID } from '@common/utils/itemIDutils';

const LinkLabel = ({ id, onRemove }: { id: number; onRemove: () => void }) => {
    return (
        <Paper>
            <Grid2 container sx={{ marginY: 3, paddingX: 1 }} spacing={2} rowSpacing={4}>
                <CenteredGrid size={12}>
                    <Button
                        key={`user-link-button-${id}`}
                        id={`user-link-button-${id}`}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => onRemove()}
                    >
                        Удалить
                    </Button>
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField id={`user-link-name-${id}`} label={`Название Соц.Сети ${id}`} />
                </CenteredGrid>
                <CenteredGrid size={6}>
                    <TextField id={`user-link-name-link-${id}`} label="Ссылка на Соц.Сеть" />
                </CenteredGrid>
            </Grid2>
        </Paper>
    );
};
export const LinksLabels = ({
    links,
    setLinks,
}: {
    links: IDs[];
    setLinks: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(links, setLinks);
                    }}
                >
                    {' '}
                    Добавить ссылку{' '}
                </Button>
            </CenteredGrid>
            {links.map((link: IDs) => (
                <LinkLabel
                    key={link.id}
                    id={link.id}
                    onRemove={() => {
                        removeItemID(link.id, links, setLinks);
                    }}
                />
            ))}
        </>
    );
};
