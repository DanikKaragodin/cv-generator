import { View, Text, Link, Image } from '@react-pdf/renderer';
import { pdfStyles } from '@common/styles/pdfStyles';
import { FormData } from '@common/types/Labels';

function PDFheader({ formData }: { formData: FormData }) {
    return (
        <>
            <View style={pdfStyles.backgroundShape} />
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
        </>
    );
}

export default PDFheader;
