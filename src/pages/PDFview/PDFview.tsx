import { Page, View, Document, PDFViewer } from '@react-pdf/renderer';
import { Container } from '@mui/material';
import { pdfStyles } from '@common/styles/pdfStyles';
import { useFormData } from '@common/contexts/FormDataContext';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import PDFheader from './PDFheader';
import PDFleftColumn from './PDFleftColumn';
import PDFrightColumn from './PDFrightColumn';
import Loading from '@common/components/Alerts/Loading';
import Error from '@common/components/Alerts/Error';

const PDFView = () => {
    const { formData } = useFormData();
    const { selectCVbyID } = UserSupabase();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCVData = async () => {
            if (id) {
                const { error } = await selectCVbyID(id);
                if (error) console.error(error);
            }
            setIsLoading(false);
        };

        loadCVData();
    }, [id]);

    if (isLoading) return <Loading />;
    else if (!formData) return <Error />;
    else if (formData) {
        return (
            <Container maxWidth="lg" classes={pdfStyles.container}>
                <PDFViewer style={pdfStyles.pdfView} key={id}>
                    <Document>
                        <Page size="A4" style={pdfStyles.page}>
                            {/* Шапка */}
                            <PDFheader formData={formData} />
                            {/* 2 Колонки */}
                            <View style={pdfStyles.twoColumn}>
                                <PDFleftColumn formData={formData} />
                                <PDFrightColumn formData={formData} />
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Container>
        );
    }
};
export default PDFView;
