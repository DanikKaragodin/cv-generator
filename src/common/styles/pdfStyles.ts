import { StyleSheet } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import roboto from '@assets/fonts/Roboto/Roboto-Regular.ttf';
import robotoBold from '@assets/fonts/Roboto/Roboto-Bold.ttf';
import robotoItalic from '@assets/fonts/Roboto/Roboto-MediumItalic.ttf';
Font.register({
    family: 'Roboto',
    format: 'truetype',
    fonts: [
        { src: roboto },
        { src: robotoBold, fontWeight: 600 },
        { src: robotoItalic, fontWeight: 400, fontStyle: 'italic' },
    ],
});
//884
export const pdfStyles = StyleSheet.create({
    container: {
        width: 'calc(100%-100px)',
    },
    pdfView: {
        border: 'none',
        marginTop: '10px',
        width: '100%',
        height: '99%',
    },
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
    backgroundShape: {
        position: 'absolute',
        width: 480,
        height: 120,
        opacity: 1,
        top: 0,
        left: 0,
        backgroundColor: '#EFF6FF',
        borderBottomRightRadius: '10px',
    },
    avatar: {
        position: 'absolute',
        top: 10,
        right: 150,
        height: 80,
        width: 80,
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 600,
        color: '#1F2937',
        marginBottom: 14,
    },
    linkDecoration: {
        color: '#3B82F6',
        textDecoration: 'none',
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
    aboutMe: {
        fontSize: 10,
        lineHeight: 1.4,
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
    educationGap: {
        marginBottom: 8,
    },
    educationSubText: {
        fontSize: 9,
        color: '#6B7280',
    },
    positionName: {
        fontWeight: 600,
        fontSize: 10,
    },
    projectLayout: {
        marginTop: 3,
        borderTop: 1,
        borderColor: '#E5E7EB',
        paddingTop: 4,
    },
    projectDesc: {
        fontStyle: 'italic',
        color: '#4B5563',
    },
    projectItem: {
        marginBottom: 10,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#3B82F6',
    },
    projectArticle: {
        marginTop: 4,
        fontWeight: 500,
    },
    projectArticleDesc: {
        color: '#4B5563',
        fontSize: 9,
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

    boldText: {
        fontWeight: 600,
    },
});
export const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Roboto',
        fontSize: 9,
        lineHeight: 1.3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    headerInfo: {
        flex: 1,
    },
    avatar: {
        width: 70,
        height: 70,
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 17,
    },
    contacts: {
        marginBottom: 8,
    },
    contactItem: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 2,
    },
    socialLinks: {
        flexDirection: 'column',
        gap: 2,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 6,
        borderBottom: '0.5px solid #333',
        paddingBottom: 2,
    },
    section: {
        marginBottom: 12,
    },
    educationGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    educationItem: {
        width: '24%',
        marginBottom: 6,
    },
    languageList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        color: '#666',
    },
    experienceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    experienceColumn: {
        width: '48%',
    },
    positionItem: {
        marginBottom: 8,
    },
    dateRange: {
        color: '#666',
        fontSize: 8,
        marginBottom: 2,
    },
    courseList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
});
