import { pdf } from '@react-pdf/renderer';
import CV1 from './CV1';

export const usePDF = () => {
    const generatePDF = async (formData: any) => {
        const blob = await pdf(<CV1 formData={formData} />).toBlob();
        return URL.createObjectURL(blob);
    };

    const previewPDF = async (formData: any) => {
        const url = await generatePDF(formData);
        window.open(url, '_blank');
    };

    const downloadPDF = async (formData: any, fileName: string = 'CV.pdf') => {
        const url = await generatePDF(formData);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return { previewPDF, downloadPDF };
};
