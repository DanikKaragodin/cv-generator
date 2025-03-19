import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { Container, Paper, Typography, Button, Grid2 } from '@mui/material';
import { UseDashboardStyles } from '@common/styles/dashboardStyles';
import { UserAuth } from '@common/contexts/AuthContext';
import { routes } from '@common/constants';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import Loading from '@common/components/Alerts/Loading';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { usePDF } from '@pages/PDFview/usePDF';

function Dashboard() {
    const [CVList, setCVList] = useState<{ id: string; cv_name: string; created_at: string }[] | undefined | null>(
        null,
    );
    const { isAuthorized, userID } = UserAuth();
    const [isLoad, setisLoad] = useState<boolean>(true);
    const { selectCVbyUserID, selectCVbyID, deleteCVbyID } = UserSupabase();
    const { classes } = UseDashboardStyles();
    const navigate = useNavigate();
    const { previewPDF } = usePDF();

    const handlePreview = async (cvId: string) => {
        try {
            const { data, error } = await selectCVbyID(cvId);
            if (error) throw error;
            if (data) {
                await previewPDF(data);
            }
        } catch (err) {
            console.error('Ошибка при предпросмотре:', err);
        }
    };
    const handleDeleteCV = async (cvId: string) => {
        if (window.confirm('Вы уверены, что хотите удалить это резюме?')) {
            const result = await deleteCVbyID(cvId);
            if (result.success) setCVList((prev) => (Array.isArray(prev) ? prev.filter((cv) => cv.id !== cvId) : prev));
        }
    };

    useEffect(() => {
        const loadCVList = async () => {
            if (!isAuthorized) {
                setCVList(null);
                setisLoad(false);
                return;
            }
            const result = await selectCVbyUserID(userID);
            if (result.success && result.data) setCVList(result.data);
            setisLoad(false);
        };

        loadCVList();
    }, [isAuthorized]);
    if (isLoad) return <Loading />;
    return (
        <Container maxWidth="md" className={classes.root}>
            {CVList?.length ? (
                <Grid2 container spacing={3}>
                    {CVList.map((cv, index) => (
                        <Grid2 size={12} key={cv.id}>
                            <Paper elevation={4} className={classes.paper}>
                                <Typography className={classes.indexNumber}>{index + 1}.</Typography>

                                <div className={classes.cvItemContent}>
                                    <div className={classes.cvItemText}>
                                        <Typography variant="body1" fontWeight={500}>
                                            {cv.cv_name}
                                        </Typography>

                                        <span className={classes.divider} />

                                        <Typography variant="body2" color="textSecondary">
                                            {new Date(cv.created_at).toLocaleDateString()}
                                        </Typography>
                                    </div>

                                    <div className={classes.buttonGroup}>
                                        <Tooltip title="Редактировать">
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => {
                                                    navigate(generatePath(routes.editCV.href, { id: cv.id }));
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Просмотреть">
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={
                                                    () => handlePreview(cv.id)
                                                    //     {
                                                    //     navigate(generatePath(routes.finishedPDF.href, { id: cv.id }));
                                                    // }
                                                }
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Удалить">
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteCV(cv.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Paper className={classes.emptyState}>
                    <Typography variant="h5" gutterBottom>
                        У вас пока нет ни одного резюме
                    </Typography>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        Хотите создать своё первое резюме?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.createButton}
                        onClick={() => navigate(routes.createCV.href)}
                    >
                        Создать резюме
                    </Button>
                </Paper>
            )}
        </Container>
    );
}

export default Dashboard;
