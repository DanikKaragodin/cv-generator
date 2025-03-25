import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '@common/styles/pdfStyles';
import { FormData } from '@common/types/Labels';

function PDFleftColumn({ formData }: { formData: FormData }) {
    return (
        <>
            {/* Левая колонка */}
            <View style={pdfStyles.leftColumn}>
                {/* О себе */}
                {formData.aboutMe && (
                    <View style={pdfStyles.section}>
                        <Text style={pdfStyles.sectionTitle}>Обо мне</Text>
                        <Text style={pdfStyles.aboutMe}>{formData?.aboutMe}</Text>
                    </View>
                )}

                {/* Скиллы */}
                {formData.technicalSkills.length != 0 && (
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
                )}

                {/* Языки */}
                {formData.languageLabels.length != 0 && (
                    <View style={pdfStyles.section}>
                        <Text style={pdfStyles.sectionTitle}>Языки</Text>
                        {formData?.languageLabels.map((language, index) => (
                            <View key={index} style={pdfStyles.compactRow}>
                                <Text>{language.name}</Text>
                                <Text style={pdfStyles.dateText}>{language.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Образование */}
                {formData.educationLabels.length != 0 && (
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
                                <Text style={pdfStyles.educationSubText}>{education.specialization}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Курсы */}
                {formData.courseLabels.length != 0 && (
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
                )}
            </View>
        </>
    );
}
export default PDFleftColumn;
