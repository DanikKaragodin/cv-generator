import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from '@common/styles/pdfStyles';
import { FormData } from '@common/types/Labels';
// import PDFheader from './PDFheader';
// import PDFleftColumn from './PDFleftColumn';
// import PDFrightColumn from './PDFrightColumn';
const MAX_STRING_SIZE_REGEX = /.{1,120}/g;
const CV1 = ({ formData }: { formData: FormData }) => (
    // <Document>
    //     <Page size="A4" style={pdfStyles.page}>
    //         <PDFheader formData={formData} />
    //         <View style={pdfStyles.columnsContainer}>
    //             <PDFleftColumn formData={formData} />
    //             <PDFrightColumn formData={formData} />
    //         </View>
    //     </Page>
    // </Document>
    <Document key={Math.random().toString(30)}>
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
                            <Text key={social.name + i} style={styles.socialLink}>
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
                <View>
                    {formData.aboutMe.match(MAX_STRING_SIZE_REGEX)?.map((row) => (
                        <Text key={row} style={styles.description}>
                            {row}
                        </Text>
                    ))}
                </View>
                {/* <Text style={styles.aboutMeText}>{formData.aboutMe}</Text> */}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ОБРАЗОВАНИЕ</Text>
                <View style={styles.educationGrid}>
                    {formData.educationLabels.map((edu, i) => (
                        <View key={edu.name + i} style={styles.educationItem}>
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
                <Text style={styles.sectionTitle}>ЯЗЫКИ</Text>
                <View style={styles.languageList}>
                    {formData.languageLabels.map((lang, i) => (
                        <Text key={lang.name + i}>
                            {lang.name} ({lang.degree}){i < formData.languageLabels.length - 1 ? ', ' : ''}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>КУРСЫ</Text>
                <View style={styles.courseList}>
                    {formData.courseLabels.map((course, i) => (
                        <View key={course.name + i} style={styles.educationItem}>
                            <Text style={styles.italic}>{course.name}</Text>
                            <Text style={styles.dateRange}>
                                {course.dataStart} - {course.dataEnd}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>НАВЫКИ</Text>
                <View style={styles.skillsList}>
                    {formData.technicalSkills.map((skill, i) => (
                        <Text key={skill + i}>
                            {skill}
                            {i !== formData.technicalSkills.length - 1 ? ', ' : ''}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ОПЫТ РАБОТЫ</Text>
                <View style={styles.experienceGrid}>
                    <View style={styles.column}>
                        {formData.positionLabels.map((position, i) => (
                            <View key={position.name + i} style={styles.positionItem}>
                                <Text style={styles.positionName}>{position.name}</Text>
                                <Text style={styles.dateRange}>
                                    {position.dataStart} - {position.dataEnd}
                                </Text>
                                <View>
                                    {position.description.match(MAX_STRING_SIZE_REGEX)?.map((desc) => (
                                        <Text key={desc} style={styles.description}>
                                            {desc}
                                        </Text>
                                    ))}
                                </View>
                                {position.tasks.map((task, j) => (
                                    <Text key={position.name + task + j}>• {task}</Text>
                                ))}
                                <Text style={styles.positionStack}>Стек: {position.stack.join(', ')}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default CV1;
