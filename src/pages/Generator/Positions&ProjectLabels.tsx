import { CenteredGrid } from '@common/components/CenteredGrid/CenteredGrid';
import { IDs } from '@common/types/IDs';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemID, removeItemID } from '@common/utils/itemIDutils';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const ProjectsLabel = ({ id_position, id, onRemove }: { id_position: number; id: number; onRemove: () => void }) => {
    return (
        <>
            <Paper sx={{ width: '100%' }}>
                <Grid2 container sx={{ marginY: 3, paddingX: 1, justifyContent: 'center' }} spacing={2} rowSpacing={4}>
                    {/* Кнопка удаления */}
                    <CenteredGrid size={12}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onRemove()}>
                            Удалить
                        </Button>
                    </CenteredGrid>
                    <CenteredGrid size={11}>
                        <TextField
                            multiline
                            id={`user-project-text-${id_position}-${id}`}
                            label={`Описание проекта ${id}`}
                            rows={4}
                            sx={{ width: '100%' }}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Autocomplete
                            sx={{ paddingX: 1, width: '100%' }}
                            multiple
                            id={`user-project-tags-tasks-${id_position}-${id}`}
                            options={[].map((option) => option)}
                            defaultValue={['Samara']}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Выполняемые задачи"
                                    placeholder="Выполняемые задачи"
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={12}>
                        <Autocomplete
                            sx={{ paddingX: 1, width: '100%' }}
                            multiple
                            id={`user-project-tags-stack-${id_position}-${id}`}
                            options={[].map((option) => option)}
                            defaultValue={['Samara']}
                            freeSolo
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return <Chip variant="outlined" label={option} key={key} {...tagProps} />;
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Стек Технологий"
                                    placeholder="Стек Технологий"
                                />
                            )}
                        />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <DatePicker data-id={`user-project-dataStart-${id_position}-${id}`} label="Дата начало" />
                    </CenteredGrid>
                    <CenteredGrid size={6}>
                        <DatePicker data-id={`user-project-dataEnd-${id_position}-${id}`} label="Дата окончания" />
                    </CenteredGrid>
                </Grid2>
            </Paper>
        </>
    );
};

const ProjectsLabels = ({
    projects,
    setProjects,
    id_position,
}: {
    id_position: number;
    projects: IDs[];
    setProjects: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(projects, setProjects);
                    }}
                >
                    Добавить Проект
                </Button>
            </CenteredGrid>
            {projects.map((link: IDs) => (
                <ProjectsLabel
                    key={link.id}
                    id={link.id}
                    id_position={id_position}
                    onRemove={() => {
                        removeItemID(link.id, projects, setProjects);
                    }}
                />
            ))}
        </>
    );
};

const PositionsLabel = ({ id, onRemove }: { id: number; onRemove: () => void }) => {
    const [projects, setProjects] = useState<IDs[]>([]);
    return (
        <>
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
                            id={`user-position-name-${id}`}
                            label="Позиция"
                            helperText="Incorrect entry."
                        />
                    </CenteredGrid>
                    <ProjectsLabels id_position={id} projects={projects} setProjects={setProjects}></ProjectsLabels>
                </Grid2>
            </Paper>
        </>
    );
};

export const PositionsLabels = ({
    positions,
    setPositions,
}: {
    positions: IDs[];
    setPositions: React.Dispatch<React.SetStateAction<IDs[]>>;
}) => {
    return (
        <>
            <CenteredGrid size={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        addItemID(positions, setPositions);
                    }}
                >
                    {' '}
                    Добавить Позицию{' '}
                </Button>
            </CenteredGrid>
            {positions.map((link: IDs) => (
                <PositionsLabel
                    key={link.id}
                    id={link.id}
                    onRemove={() => {
                        removeItemID(link.id, positions, setPositions);
                    }}
                />
            ))}
        </>
    );
};
