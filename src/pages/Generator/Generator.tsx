import { Button, Container } from '@mui/material';
import About from './About/About';
import { FormData } from '@common/types/Labels.ts';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import Skills from './Skills/Skills';
import Education from './Education/Education';
import Positions from './Projects/Positions';
import { useNavigate, useParams } from 'react-router';
import { UseMUIStyles } from '@common/styles/muiStyles';
import { useFormData } from '@common/contexts/FormDataContext';
import { UserAuth } from '@common/contexts/AuthContext';
import { routes } from '@common/constants';
import { useEffect, useMemo } from 'react';

function Generator() {
    const { formData } = useFormData();
    const { id } = useParams<{ id: string }>();
    console.log(id);
    const { session, insertCVbyID, selectCVbyID } = UserAuth();
    const { setFormData } = useFormData();
    const { classes } = UseMUIStyles();
    const navigate = useNavigate();
    const defaultState = useMemo(() => {
        return {
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
        };
    }, []);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: 'all',
        defaultValues: defaultState,
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
    const onSubmit: SubmitHandler<FormData> = async (inputData) => {
        console.log('Собранные данные:', inputData);
        setFormData(inputData);
        try {
            if (session?.user.id) {
                const result = await insertCVbyID(session.user.id, inputData);

                if (result.success) {
                    console.log('good!');
                    navigate(routes.pdfView.href);
                } else {
                    console.error(result.error);
                }
            }
        } catch (err) {
            console.error('An unexpected error occurred: ', err);
        }
    };
    // Загрузка данных при наличии ID
    useEffect(() => {
        const loadCVData = async () => {
            if (id && id !== ':id') {
                try {
                    const { success, error } = await selectCVbyID(id);

                    if (success) {
                        if (formData) reset(formData);
                    } else {
                        console.error(error);
                    }
                } catch (e) {
                    console.error('Произошла ошибка при загрузке данных: ', e);
                }
            } else {
                reset(defaultState);
                links.replace([]);
                languages.replace([]);
                educations.replace([]);
                courses.replace([]);
                positions.replace([]);
                return;
            }
        };

        loadCVData();
    }, [id]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Positions control={control} errors={errors} fieldArray={positions}></Positions>
            <Container maxWidth="sm" className={classes.sumbitCVcontainer}>
                <Button type="submit" variant="contained">
                    Собрать резюме
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
