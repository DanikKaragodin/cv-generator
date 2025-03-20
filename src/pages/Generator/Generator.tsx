import { Button, Checkbox, Container, FormControlLabel, FormGroup } from '@mui/material';
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
    const [needToChangeDefaults, setNeedToChangeDefaults] = useState<boolean>(false);
    const [isLoad, setisLoad] = useState<boolean>(true);
    const { userID } = UserAuth();
    const { insertCVbyID, selectCVbyID, selectDefaultsbyUserID, updateCVbyID, insertDefaultsbyUserID } = UserSupabase();
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

    // интересуют параметры fields , prepend, remove
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
        const result =
            isEditMode && id ? await updateCVbyID(userID, id, inputData) : await insertCVbyID(userID, inputData);
        if (needToChangeDefaults) await insertDefaultsbyUserID(userID, inputData);
        if (result.success) {
            console.log('good!');
            navigate(routes.createdPDF.href);
        }
    };

    useEffect(() => {
        const loadCVData = async () => {
            if (id) {
                const { success, data } = await selectCVbyID(id);
                if (success && data) {
                    setisEditMode(true);
                    reset(data);
                    setisLoad(false);
                    return;
                }
            }
            if (userID) {
                const { success, data } = await selectDefaultsbyUserID(userID);
                if (success && data) {
                    reset(data);
                    setisLoad(false);
                    return;
                }
            }
            resetFormData(reset, [links, languages, educations, courses, positions]);
            setisLoad(false);
        };

        loadCVData();
    }, [id, userID]);
    if (isLoad) return <Loading />;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <About control={control} errors={errors} fieldArray={links}></About>
            <Skills control={control} errors={errors} fieldArray={languages}></Skills>
            <Education control={control} errors={errors} fieldArray={educations} fieldArray2={courses}></Education>
            <Positions control={control} errors={errors} fieldArray={positions}></Positions>
            <Container maxWidth="md" className={classes.sumbitCVcontainer}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={needToChangeDefaults}
                                onChange={(e) => setNeedToChangeDefaults(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Обновить значения по умолчанию"
                    />
                </FormGroup>
            </Container>
            <Container maxWidth="md" className={classes.sumbitCVcontainer}>
                <Button type="submit" variant="contained">
                    {isEditMode ? 'Обновить резюме' : 'Собрать резюме'}
                </Button>
            </Container>
        </form>
    );
}
export default Generator;
