import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { Container, Paper, Typography, Button, Fade, Grid2 } from '@mui/material';
import { UseDashboardStyles } from '@common/styles/dashboardStyles';
import { UserAuth } from '@common/contexts/AuthContext';
import { routes } from '@common/constants';

function Dashboard() {
    const [CVList, setCVList] = useState<{ id: string; cv_name: string }[] | undefined | null>(null);
    const { session, selectCVbyUserID, deleteCVbyID } = UserAuth();
    const { classes } = UseDashboardStyles();
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleDeleteCV = async (cvId: string) => {
        if (window.confirm('Вы уверены, что хотите удалить это резюме?')) {
            try {
                const result = await deleteCVbyID(cvId);

                if (result.success) {
                    setCVList((prev) => (Array.isArray(prev) ? prev.filter((cv) => cv.id !== cvId) : prev));
                } else {
                    console.error('Ошибка удаления:', result.error);
                }
            } catch (error) {
                console.error('Ошибка при удалении:', error);
            }
        }
    };

    useEffect(() => {
        const loadCVList = async () => {
            if (!session?.user?.id) {
                setCVList(null);
                return;
            }
            try {
                const result = await selectCVbyUserID(session.user.id);

                if (result.success) {
                    setCVList(result.data);
                } else {
                    console.error(result.error);
                    setCVList(null);
                }
            } catch (err) {
                setCVList(null);
                console.error(err);
            }
        };

        loadCVList();
    }, [session, selectCVbyUserID, setCVList]);
    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid2 container spacing={3}>
                {CVList &&
                    Array.isArray(CVList) &&
                    CVList.map((cv, index: number) => (
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
                                    {cv.cv_name}
                                </Typography>

                                {hoveredItem === cv.id && (
                                    <Fade in>
                                        <div className={classes.overlay}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => {
                                                    navigate(generatePath(routes.createCV.href, { id: cv.id }));
                                                }}
                                            >
                                                Редактировать
                                            </Button>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => {
                                                    navigate(generatePath(routes.pdfView.href, { id: cv.id }));
                                                }}
                                            >
                                                Просмотреть
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                className={classes.button}
                                                onClick={() => handleDeleteCV(cv.id)}
                                            >
                                                Удалить
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
