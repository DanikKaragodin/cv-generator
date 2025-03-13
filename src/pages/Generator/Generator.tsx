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
import { defaultState, routes } from '@common/constants';
import { useEffect, useState } from 'react';
import { UserSupabase } from '@common/contexts/SupabaseContext';
import { resetFormData } from '@common/utils/resetFormData';

function Generator() {
    const { formData, setFormData } = useFormData();
    const { id } = useParams<{ id: string }>();
    const [isUpdate, setisUpdate] = useState<boolean>(false);
    const { isAuth, userID } = UserAuth();
    const { insertCVbyID, selectCVbyID, selectDefaultsbyUserID, updateCVbyID } = UserSupabase();
    const { classes } = UseMUIStyles();
    const navigate = useNavigate();

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
            if (isAuth && id) {
                const result = isUpdate
                    ? await updateCVbyID(userID, id, inputData)
                    : await insertCVbyID(userID, inputData);

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

    useEffect(() => {
        const loadCVData = async () => {
            if (id && id !== ':id') {
                try {
                    const { success, error, data } = await selectCVbyID(id);
                    console.log(success, error, formData);
                    if (success && data) {
                        setisUpdate(true);
                        reset(data);
                    } else {
                        console.error(error);
                    }
                } catch (e) {
                    console.error('Произошла ошибка при загрузке данных: ', e);
                }
            } else {
                if (userID) {
                    try {
                        const { success, error, data } = await selectDefaultsbyUserID(userID);
                        console.log(success, error, data);
                        if (success && data) {
                            reset(data);
                        } else {
                            console.error(error);
                        }
                    } catch (e) {
                        console.error('Произошла ошибка при загрузке данных: ', e);
                    }
                } else {
                    resetFormData(reset, [links, languages, educations, courses, positions]);
                }
                return;
            }
        };

        loadCVData();
    }, [id, setisUpdate, isUpdate, userID]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Positions control={control} errors={errors} fieldArray={positions}></Positions>
            <Container maxWidth="sm" className={classes.sumbitCVcontainer}>
                <Button type="submit" variant="contained">
                    {isUpdate ? 'Обновить резюме' : 'Собрать резюме'}
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
