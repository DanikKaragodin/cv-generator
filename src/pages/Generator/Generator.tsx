import { Button, Container } from '@mui/material';
import About from './About/About';
import { FormData } from '@common/types/Labels.ts';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import Skills from './Skills/Skills';
import Education from './Education/Education';
import Projects from './Projects/Projects';

function Generator() {
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
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Собранные данные:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Projects control={control} errors={errors} fieldArray={positions}></Projects>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                <Button type="submit" variant="outlined">
                    Собрать резюме
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
