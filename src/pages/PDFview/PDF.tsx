import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Typography, Button, Box, Grid2 } from '@mui/material';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import Loading from '@common/components/Alerts/Loading';
import Error from '@common/components/Alerts/Error';
import { useFormData } from '@common/contexts/FormDataContext';
import { usePDF } from './usePDF';
// import PDFheader from './PDFheader';
// import PDFleftColumn from './PDFleftColumn';
// import PDFrightColumn from './PDFrightColumn';

const PDF = () => {
    const { selectCVbyID } = UserSupabase();
    const { id } = useParams<{ id: string }>();
    const { formData, setFormData } = useFormData();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { previewPDF, downloadPDF } = usePDF();
    useEffect(() => {
        const loadCVData = async () => {
            try {
                if (id) {
                    const { data, error } = await selectCVbyID(id);
                    if (error) throw error;
                    if (data) await setFormData(data);
                }
            } catch (err) {
                setError('Ошибка загрузки резюме');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCVData();
    }, [id]);

    const handleDownload = async () => {
        if (formData) {
            await downloadPDF(formData, `${formData.CVname}.pdf`);
        }
    };

    if (isLoading) return <Loading />;
    if (!formData || error) return <Error />;
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" textAlign="center">
                <Grid2 container direction="column" spacing={3} maxWidth="sm">
                    <Grid2>
                        <Typography variant="h4" gutterBottom>
                            Резюме успешно собрано!
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Вы можете просмотреть или скачать готовое резюме
                        </Typography>
                    </Grid2>

                    <Grid2 container spacing={2} justifyContent="center">
                        <Grid2>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => previewPDF(formData)}
                            >
                                Посмотреть резюме
                            </Button>
                        </Grid2>
                        <Grid2>
                            <Button variant="outlined" color="primary" size="large" onClick={handleDownload}>
                                Скачать PDF
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
};

export default PDF;
