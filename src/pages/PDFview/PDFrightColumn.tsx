import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from '@common/styles/pdfStyles';
import { FormData } from '@common/types/Labels';

function PDFrightColumn({ formData }: { formData: FormData }) {
    console.log(formData.positionLabels);
    return (
        <>
            {/* Правая колонка */}
            <View style={pdfStyles.rightColumn}>
                {/* Позиции */}
                {formData.positionLabels.length != 0 && (
                    <View style={pdfStyles.section}>
                        <Text style={pdfStyles.sectionTitle}>Опыт работы </Text>
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
                                        <Text style={pdfStyles.projectDesc}>{position.description}</Text>
                                    </View>
                                    <Text style={pdfStyles.projectArticle}>Задачи:</Text>
                                    <View style={pdfStyles.bulletList}>
                                        {position.tasks.map((task, tIndex) => (
                                            <Text key={tIndex}>{`- ${task}`}</Text>
                                        ))}
                                    </View>
                                    <Text style={pdfStyles.projectArticle}>Стек:</Text>
                                    <Text style={pdfStyles.projectArticleDesc}>{position.stack.join(' • ')}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </>
    );
}

export default PDFrightColumn;
