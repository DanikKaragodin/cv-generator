import { Page, Text, View, Document, PDFViewer, Link, Image } from '@react-pdf/renderer';
import { Container } from '@mui/material';
import { pdfStyles } from '@common/styles/pdfStyles';
import { useFormData } from '@common/contexts/FormDataContext';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { UserAuth } from '@common/contexts/AuthContext';

const PDFView = () => {
    const { formData } = useFormData();
    const { selectCVbyID } = UserAuth();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const loadCVData = async () => {
            if (id && id !== ':id') {
                try {
                    const { error } = await selectCVbyID(id);
                    if (error) {
                        console.error(error);
                    }
                } catch (e) {
                    console.error('Произошла ошибка при загрузке данных: ', e);
                }
            }
        };

        loadCVData();
    }, [id]);
    if (formData) {
        return (
            <Container maxWidth="lg">
                {/* Косяки с рендером при переключении резюме */}
                <PDFViewer style={pdfStyles.pdfView} key={Math.random().toString(16)}>
                    <Document>
                        <Page size="A4" style={pdfStyles.page}>
                            <View style={pdfStyles.backgroundShape} />
                            {/* Header */}
                            <View style={pdfStyles.header}>
                                <Text style={pdfStyles.name}>
                                    {formData?.name} {formData?.lastName}
                                </Text>
                                <View style={pdfStyles.iconText}>
                                    <Link src={`mailto:${formData?.email}`} style={pdfStyles.linkDecoration}>
                                        {formData?.email}
                                    </Link>
                                    <Link src={`tel:${formData?.telephone}`} style={pdfStyles.linkDecoration}>
                                        {formData?.telephone}
                                    </Link>
                                </View>
                                {formData?.socialLabels.map((social, index) => (
                                    <View key={index} style={pdfStyles.iconText}>
                                        <Text> {social.name} - </Text>
                                        <Link src={social.url} style={pdfStyles.linkDecoration}>
                                            {social.url}
                                        </Link>
                                    </View>
                                ))}
                                {formData?.avatar ? <Image src={formData?.avatar} style={pdfStyles.avatar} /> : null}
                            </View>

                            {/* Two Columns */}
                            <View style={pdfStyles.twoColumn}>
                                {/* Left Column */}
                                <View style={pdfStyles.leftColumn}>
                                    {/* About */}
                                    {formData?.aboutMe && (
                                        <View style={pdfStyles.section}>
                                            <Text style={pdfStyles.sectionTitle}>Обо мне</Text>
                                            <Text style={pdfStyles.aboutMe}>{formData?.aboutMe}</Text>
                                        </View>
                                    )}

                                    {/* Tech Skills */}
                                    <View style={pdfStyles.section}>
                                        <Text style={pdfStyles.sectionTitle}>Навыки</Text>
                                        <View style={pdfStyles.skillItem}>
                                            {formData?.technicalSkills.map((skill, index) => (
                                                <Text key={index} style={pdfStyles.skillTag}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Languages */}
                                    <View style={pdfStyles.section}>
                                        <Text style={pdfStyles.sectionTitle}>Языки</Text>
                                        {formData?.languageLabels.map((language, index) => (
                                            <View key={index} style={pdfStyles.compactRow}>
                                                <Text>{language.name}</Text>
                                                <Text style={pdfStyles.dateText}>{language.degree}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Education */}
                                    <View style={pdfStyles.section}>
                                        <Text style={pdfStyles.sectionTitle}>Образование</Text>
                                        {formData?.educationLabels.map((education, index) => (
                                            <View key={index} style={pdfStyles.educationGap}>
                                                <View style={pdfStyles.compactRow}>
                                                    <Text style={pdfStyles.boldText}>{education.name}</Text>
                                                    <Text style={pdfStyles.dateText}>
                                                        {education.dataStart} - {education.dataEnd}
                                                    </Text>
                                                </View>
                                                <Text style={pdfStyles.educationSubText}>{education.faculty}</Text>
                                                <Text style={pdfStyles.educationSubText}>
                                                    {education.specialization}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Courses */}
                                    <View style={pdfStyles.section}>
                                        <Text style={pdfStyles.sectionTitle}>Курсы</Text>
                                        {formData?.courseLabels.map((course, index) => (
                                            <View key={index} style={pdfStyles.compactRow}>
                                                <Text>{course.name}</Text>
                                                <Text style={pdfStyles.dateText}>
                                                    {course.dataStart} - {course.dataEnd}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Right Column */}
                                <View style={pdfStyles.rightColumn}>
                                    {/* Projects */}
                                    <View style={pdfStyles.section}>
                                        <Text style={pdfStyles.sectionTitle}>Опыт работы</Text>
                                        {formData?.positionLabels.map((position, index) => (
                                            <View key={index} style={pdfStyles.projectItem}>
                                                <View style={pdfStyles.compactRow}>
                                                    <Text style={pdfStyles.positionName}>{position.name}</Text>
                                                </View>
                                                <View key={`project-${index}`} style={pdfStyles.projectLayout}>
                                                    <View style={pdfStyles.compactRow}>
                                                        <Text style={pdfStyles.dateText}>
                                                            {position.dataStart} - {position.dataEnd}
                                                        </Text>
                                                    </View>
                                                    <View style={pdfStyles.compactRow}>
                                                        <Text style={pdfStyles.projectDesc}>
                                                            {position.description}
                                                        </Text>
                                                    </View>
                                                    <Text style={pdfStyles.projectArticle}>Задачи:</Text>
                                                    <View style={pdfStyles.bulletList}>
                                                        {position.tasks.map((task, tIndex) => (
                                                            <Text key={tIndex}>{`- ${task}`}</Text>
                                                        ))}
                                                    </View>
                                                    <Text style={pdfStyles.projectArticle}>Стек:</Text>
                                                    <Text style={pdfStyles.projectArticleDesc}>
                                                        {position.stack.join(' • ')}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Container>
        );
    } else {
        return 'Ошибка сборки';
    }
};

export default PDFView;
