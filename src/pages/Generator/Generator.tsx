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
import Loading from '@common/components/Alerts/Loading';

function Generator() {
    const { setFormData } = useFormData();
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setisEditMode] = useState<boolean>(false);
    const [isLoad, setisLoad] = useState<boolean>(true);
    const { isAuthorized, userID } = UserAuth();
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
            if (id) {
                const result = isEditMode
                    ? await updateCVbyID(userID, id, inputData)
                    : await insertCVbyID(userID, inputData);

                if (result.success) {
                    console.log('good!');
                    navigate(routes.createdPDF.href);
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
            if (isAuthorized) {
                if (id) {
                    try {
                        const { success, error, data } = await selectCVbyID(id);
                        if (success && data) {
                            setisEditMode(true);
                            reset(data);
                        } else {
                            console.error(error);
                        }
                    } catch (e) {
                        console.error('Произошла ошибка при загрузке данных: ', e);
                    } finally {
                        setisLoad(false);
                    }
                } else {
                    if (userID) {
                        try {
                            const { success, error, data } = await selectDefaultsbyUserID(userID);
                            if (success && data) {
                                reset(data);
                            } else {
                                console.error(error);
                            }
                        } catch (e) {
                            console.error('Произошла ошибка при загрузке данных: ', e);
                        } finally {
                            setisLoad(false);
                        }
                    } else {
                        resetFormData(reset, [links, languages, educations, courses, positions]);
                        setisLoad(false);
                    }
                    return;
                }
            }
        };

        loadCVData();
    }, [id, isAuthorized, userID]);
    if (isLoad) return <Loading />;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Positions control={control} errors={errors} fieldArray={positions}></Positions>
            <Container maxWidth="sm" className={classes.sumbitCVcontainer}>
                <Button type="submit" variant="contained">
                    {isEditMode ? 'Обновить резюме' : 'Собрать резюме'}
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
