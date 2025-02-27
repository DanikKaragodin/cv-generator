import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Paper, Typography, Button, Fade, Grid2 } from '@mui/material';
import { UseDashboardStyles } from '@common/styles/dashboardStyles';

// Затычки для вёрстки
interface CVItem {
    id: string;
    name: string;
}

const CVList: CVItem[] = Array.from({ length: 9 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Имя резюме ${i + 1}`,
}));

function Dashboard() {
    const { classes } = UseDashboardStyles();
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid2 container spacing={3}>
                {CVList.map((cv, index) => (
                    <Grid2
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={cv.id}
                        className={classes.gridItem}
                        onMouseEnter={() => setHoveredItem(cv.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <Paper elevation={4} className={classes.paper}>
                            <Typography variant="h3" color="textSecondary" className={classes.indexNumber}>
                                {index + 1}.
                            </Typography>
                            <Typography variant="h6" className={classes.cvName}>
                                {cv.name}
                            </Typography>

                            {hoveredItem === cv.id && (
                                <Fade in>
                                    <div className={classes.overlay}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() => {
                                                navigate('/create-cv/' /* cv.id */);
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() => {
                                                navigate('/create-cv/pdf-view/' /*  cv.id */);
                                            }}
                                        >
                                            Просмотреть
                                        </Button>
                                    </div>
                                </Fade>
                            )}
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
}

export default Dashboard;
