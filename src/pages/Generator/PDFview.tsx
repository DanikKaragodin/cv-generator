import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Link } from '@react-pdf/renderer';
import { useLocation } from 'react-router';
import { Container } from '@mui/material';
import { FormData } from '@common/types/Labels';
import roboto from '@common/fonts/Roboto/Roboto-Regular.ttf';
import robotoBold from '@common/fonts/Roboto/Roboto-Bold.ttf';
import robotoItalic from '@common/fonts/Roboto/Roboto-MediumItalic.ttf';

Font.register({
    family: 'Roboto',
    format: 'truetype',
    fonts: [
        { src: roboto },
        { src: robotoBold, fontWeight: 600 },
        { src: robotoItalic, fontWeight: 400, fontStyle: 'italic' },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'Roboto',
        fontSize: 10,
        lineHeight: 1.4,
        position: 'relative',
    },
    twoColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    leftColumn: {
        flex: 1,
        marginRight: 0,
        paddingRight: 40,
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
    },
    rightColumn: {
        flex: 1,
        marginLeft: 15,
        paddingLeft: 15,
    },
    header: {
        marginBottom: 6,
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#3B82F6',
        minHeight: 120,
    },
    name: {
        fontSize: 20,
        fontWeight: 600,
        color: '#1F2937',
        marginBottom: 14,
    },
    section: {
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 600,
        marginBottom: 8,
        color: '#3B82F6',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    skillItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: 6,
        marginBottom: 8,
    },
    skillTag: {
        backgroundColor: '#EFF6FF',
        borderRadius: 4,
        padding: '5px 8px 1px 8px',
        color: '#1D4ED8',
        fontSize: 8,
        fontWeight: 500,
    },
    projectItem: {
        marginBottom: 10,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#3B82F6',
    },
    bulletList: {
        marginLeft: 12,
    },
    compactRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
    },
    dateText: {
        color: '#6B7280',
        fontSize: 9,
        fontWeight: 500,
        marginLeft: 4,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    backgroundShape: {
        position: 'absolute',
        width: 480,
        height: 120,
        opacity: 0.3,
    },
});

const BackgroundShapes = () => (
    <>
        <View
            style={[
                styles.backgroundShape,
                { top: 0, left: 0, backgroundColor: '#3b82f6', borderBottomRightRadius: '10px' },
            ]}
        />
    </>
);

const PDFView: React.FC = () => {
    const location = useLocation();
    const inputData: FormData = location.state?.inputData || {};
    console.log(inputData);
    return (
        <Container maxWidth="lg">
            {inputData?.name ? (
                <PDFViewer width="100%" height="99%" style={{ border: 'none', marginTop: '10px' }} showToolbar={false}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <BackgroundShapes />
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.name}>
                                    {inputData.name} {inputData.lastName}
                                </Text>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}
                                >
                                    <View style={styles.iconText}>
                                        <Link
                                            src={`mailto:${inputData.email}`}
                                            style={{ color: '#3B82F6', textDecoration: 'none' }}
                                        >
                                            {inputData.email}
                                        </Link>
                                        <Link
                                            src={`tel:${inputData.telephone}`}
                                            style={{ color: '#3B82F6', textDecoration: 'none' }}
                                        >
                                            {inputData.telephone}
                                        </Link>
                                    </View>
                                </View>
                                {inputData.socialLabels.map((social, index) => (
                                    <View key={index} style={styles.iconText}>
                                        <Text> {social.name} - </Text>
                                        <Link src={social.url} style={{ color: '#3B82F6', textDecoration: 'none' }}>
                                            {social.url}
                                        </Link>
                                    </View>
                                ))}
                            </View>

                            {/* Two Columns */}
                            <View style={styles.twoColumn}>
                                {/* Left Column */}
                                <View style={styles.leftColumn}>
                                    {/* About */}
                                    {inputData.aboutMe && (
                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Обо мне</Text>
                                            <Text style={{ fontSize: 10, lineHeight: 1.4 }}>{inputData.aboutMe}</Text>
                                        </View>
                                    )}

                                    {/* Tech Skills */}
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Навыки</Text>
                                        <View style={styles.skillItem}>
                                            {inputData.technicalSkills.map((skill, index) => (
                                                <Text key={index} style={styles.skillTag}>
                                                    {skill}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Languages */}
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Языки</Text>
                                        {inputData.languageLabels.map((language, index) => (
                                            <View key={index} style={styles.compactRow}>
                                                <Text>{language.name}</Text>
                                                <Text style={styles.dateText}>{language.degree}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Education */}
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Образование</Text>
                                        {inputData.educationLabels.map((education, index) => (
                                            <View key={index} style={{ marginBottom: 8 }}>
                                                <View style={styles.compactRow}>
                                                    <Text style={{ fontWeight: 600 }}>{education.name}</Text>
                                                    <Text style={styles.dateText}>
                                                        {education.dataStart} - {education.dataEnd}
                                                    </Text>
                                                </View>
                                                <Text style={{ fontSize: 9, color: '#6B7280' }}>
                                                    {education.faculty}
                                                </Text>
                                                <Text style={{ fontSize: 9, color: '#6B7280' }}>
                                                    {education.specialization}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Courses */}
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Курсы</Text>
                                        {inputData.courseLabels.map((course, index) => (
                                            <View key={index} style={styles.compactRow}>
                                                <Text>{course.name}</Text>
                                                <Text style={styles.dateText}>
                                                    {course.dataStart} - {course.dataEnd}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Right Column */}
                                <View style={styles.rightColumn}>
                                    {/* Projects */}
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Опыт работы</Text>
                                        {inputData.positionLabels.map((position, index) => (
                                            <View key={index} style={styles.projectItem}>
                                                <View style={styles.compactRow}>
                                                    <Text style={{ fontWeight: 600, fontSize: 10 }}>
                                                        {position.name}
                                                    </Text>
                                                </View>
                                                {position.projects.map((project, pIndex) => (
                                                    <View
                                                        key={pIndex}
                                                        style={{
                                                            marginTop: 3,
                                                            borderTop: 1,
                                                            borderColor: '#E5E7EB',
                                                            paddingTop: 4,
                                                        }}
                                                    >
                                                        <View style={styles.compactRow}>
                                                            <Text style={styles.dateText}>
                                                                {project.dataStart} - {project.dataEnd}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.compactRow}>
                                                            <Text style={{ fontStyle: 'italic', color: '#4B5563' }}>
                                                                {project.description}
                                                            </Text>
                                                        </View>
                                                        <Text style={{ marginTop: 4, fontWeight: 500 }}>Задачи:</Text>
                                                        <View style={{}}>
                                                            <Text style={{ color: '#4B5563', fontSize: 9 }}>
                                                                {project.tasks.join(', ')}
                                                            </Text>
                                                        </View>
                                                        <Text style={{ marginTop: 4, fontWeight: 500 }}>Стек:</Text>
                                                        <Text style={{ color: '#4B5563', fontSize: 9 }}>
                                                            {project.stack.join(' • ')}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            ) : (
                'Ошибка сборки'
            )}
        </Container>
    );
};

export default PDFView;
