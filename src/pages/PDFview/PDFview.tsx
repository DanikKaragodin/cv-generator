import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Typography, Button, Box, Grid2 } from '@mui/material';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import { pdf, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from '@common/styles/pdfStyles';
import { FormData } from '@common/types/Labels';
import Loading from '@common/components/Alerts/Loading';
import Error from '@common/components/Alerts/Error';
// import PDFheader from './PDFheader';
// import PDFleftColumn from './PDFleftColumn';
// import PDFrightColumn from './PDFrightColumn';

const PDFView = () => {
    const { selectCVbyID } = UserSupabase();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCVData = async () => {
            try {
                if (id) {
                    const { data, error } = await selectCVbyID(id);
                    if (error) throw error;
                    setFormData(data);
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

    const MyDocument = ({ formData }: { formData: FormData }) => (
        // <Document>
        //     <Page size="A4" style={pdfStyles.page}>
        //         <PDFheader formData={formData} />
        //         <View style={pdfStyles.columnsContainer}>
        //             <PDFleftColumn formData={formData} />
        //             <PDFrightColumn formData={formData} />
        //         </View>
        //     </Page>
        // </Document>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>
                            {formData.name} {formData.lastName}
                        </Text>

                        <View style={styles.contacts}>
                            <View style={styles.contactItem}>
                                <Text style={styles.bold}>Тел:</Text>
                                <Text>{formData.telephone}</Text>
                            </View>
                            <View style={styles.contactItem}>
                                <Text style={styles.bold}>Email:</Text>
                                <Text>{formData.email}</Text>
                            </View>
                        </View>

                        <View style={styles.socialLinks}>
                            {formData.socialLabels.map((social, i) => (
                                <Text key={i} style={{ color: '#333' }}>
                                    {social.name} - {social.url}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {formData.avatar && typeof formData.avatar === 'string' && (
                        <Image src={formData.avatar} style={styles.avatar} />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>О СЕБЕ</Text>
                    <Text style={{ color: '#444' }}>{formData.aboutMe}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ОБРАЗОВАНИЕ</Text>
                    <View style={styles.educationGrid}>
                        {formData.educationLabels.map((edu, i) => (
                            <View key={i} style={styles.educationItem}>
                                <Text style={styles.bold}>{edu.specialization}</Text>
                                <Text style={styles.italic}>{edu.name}</Text>
                                <Text style={styles.dateRange}>
                                    {edu.dataStart} - {edu.dataEnd}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '48%' }}>
                            <Text style={styles.sectionTitle}>ЯЗЫКИ</Text>
                            <View style={styles.languageList}>
                                {formData.languageLabels.map((lang, i) => (
                                    <Text key={i}>
                                        {lang.name} ({lang.degree}){i < formData.languageLabels.length - 1 ? ', ' : ''}
                                    </Text>
                                ))}
                            </View>
                        </View>

                        <View style={{ width: '48%' }}>
                            <Text style={styles.sectionTitle}>КУРСЫ</Text>
                            <View style={styles.courseList}>
                                {formData.courseLabels.map((course, i) => (
                                    <Text key={i}>
                                        {course.name}
                                        {i < formData.courseLabels.length - 1 ? ', ' : ''}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>НАВЫКИ</Text>
                    <View style={styles.skillsList}>
                        {formData.technicalSkills.map((skill, i) => (
                            <Text key={i}>
                                {skill}
                                {i !== formData.technicalSkills.length - 1 ? ', ' : ''}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ОПЫТ РАБОТЫ</Text>
                    <View style={styles.experienceGrid}>
                        <View style={styles.experienceColumn}>
                            {formData.positionLabels
                                .filter((_, i) => i % 2 === 0)
                                .map((position, i) => (
                                    <View key={i} style={styles.positionItem}>
                                        <Text style={styles.bold}>{position.name}</Text>
                                        <Text style={styles.dateRange}>
                                            {position.dataStart} - {position.dataEnd}
                                        </Text>
                                        <Text style={{ color: '#444', marginBottom: 4 }}>{position.description}</Text>
                                        {position.tasks.map((task, j) => (
                                            <Text key={j}>• {task}</Text>
                                        ))}
                                        <Text style={{ color: '#666', marginTop: 2 }}>
                                            Стек: {position.stack.join(', ')}
                                        </Text>
                                    </View>
                                ))}
                        </View>

                        <View style={styles.experienceColumn}>
                            {formData.positionLabels
                                .filter((_, i) => i % 2 === 1)
                                .map((position, i) => (
                                    <View key={i} style={styles.positionItem}>
                                        <Text style={styles.bold}>{position.name}</Text>
                                        <Text style={styles.dateRange}>
                                            {position.dataStart} - {position.dataEnd}
                                        </Text>
                                        <Text style={{ color: '#444', marginBottom: 4 }}>{position.description}</Text>
                                        {position.tasks.map((task, j) => (
                                            <Text key={j}>• {task}</Text>
                                        ))}
                                        <Text style={{ color: '#666', marginTop: 2 }}>
                                            Стек: {position.stack.join(', ')}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );

    const handlePreview = async () => {
        try {
            const blob = await pdf(<MyDocument formData={formData} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (err) {
            console.error('Ошибка генерации PDF:', err);
        }
    };

    const handleDownload = async () => {
        try {
            const blob = await pdf(<MyDocument formData={formData} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Ошибка скачивания PDF:', err);
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" textAlign="center">
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
                            <Button variant="contained" color="primary" size="large" onClick={handlePreview}>
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

export default PDFView;
