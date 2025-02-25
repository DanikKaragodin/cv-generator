import { Button, Container } from '@mui/material';
import About from './About/About';
import { FormData } from '@common/types/Labels.ts';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import Skills from './Skills/Skills';
import Education from './Education/Education';
import Positions from './Projects/Positions';
import { useNavigate } from 'react-router';
import { MUIStyles } from '@common/styles/muistyles';
import { useFormData } from '@common/contexts/FormDataContext';

function Generator() {
    const { setFormData } = useFormData();
    const { classes, cx } = MUIStyles();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all',
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            telephone: '',
            aboutMe: '',
            technicalSkills: [],
            languageLabels: [],
            educationLabels: [],
            courseLabels: [],
            positionLabels: [],
        },
    });

    // интересуют параметры fields , append, remove
    const links = useFieldArray({
        control: control,
        name: 'socialLabels',
    });
    const languages = useFieldArray({
        control: control,
        name: 'languageLabels',
    });
    const educations = useFieldArray({
        control: control,
        name: 'educationLabels',
    });
    const courses = useFieldArray({
        control: control,
        name: 'courseLabels',
    });
    const positions = useFieldArray({
        control,
        name: 'positionLabels',
    });
    const onSubmit: SubmitHandler<FormData> = (inputData) => {
        console.log('Собранные данные:', inputData);
        setFormData(inputData);
        navigate('/create-cv/pdf-view');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Positions control={control} errors={errors} fieldArray={positions}></Positions>
            <Container maxWidth="sm" className={cx(classes.sumbitCVcontainer)}>
                <Button type="submit" variant="contained">
                    Собрать резюме
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
