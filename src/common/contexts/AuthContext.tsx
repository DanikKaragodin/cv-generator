import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@common/utils/supabaseClient';
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { FormData } from '@common/types/Labels';
import { useNavigate } from 'react-router';
import { routes } from '@common/constants';
import { useFormData } from './FormDataContext';

type AuthResponse = {
    user: User | null; // Учитываем возможный null
    session: Session | null; // Учитываем возможный null
    weakPassword?: WeakPassword;
};

type AuthContextType = {
    session: Session | null | undefined;
    signUpNewUser: (
        email: string,
        password: string,
    ) => Promise<{
        success: boolean;
        data?: AuthResponse;
        error?: string;
    }>;
    signInUser: (
        email: string,
        password: string,
    ) => Promise<{
        success: boolean;
        data?: AuthResponse;
        error?: string;
    }>;
    signOut: () => Promise<void>;
    insertCVbyID: (
        user_id: string,
        formData: FormData,
    ) => Promise<{
        success: boolean;
        data?: Response;
        // error?: string | unknown;
        // data?: any[] | null;
        error?: string | unknown;
    }>;
    selectCVbyUserID: (user_id: string) => Promise<{
        success: boolean;
        data?: Response;
        error?: string | unknown;
    }>;
    selectCVbyID: (cv_id: string) => Promise<{
        success: boolean;
        data?: FormData;
        error?: string | unknown;
    }>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    signUpNewUser: async () => ({ success: false }),
    signInUser: async () => ({ success: false }),
    signOut: async () => {},
    insertCVbyID: async () => ({ success: false }),
    selectCVbyUserID: async () => ({ success: false }),
    selectCVbyID: async () => ({ success: false }),
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const { setFormData } = useFormData();
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null | undefined>();
    // Регистрация
    const signUpNewUser = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
        });

        if (error) {
            console.error('Error signing up: ', error.message);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    };

    // Вход
    const signInUser = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });

            if (error) {
                console.error('Sign-in error:', error.message);
                return { success: false, error: error.message };
            }

            console.log('Sign-in success:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during sign-in:', error);
            return {
                success: false,
                error: 'An unexpected error occurred. Please try again.',
            };
        }
    };

    useEffect(() => {
        // используется для получения текущей сессии пользователя из БД
        supabase.auth.getSession().then(({ data: { session } }) => {
            // console.log('initSession: ', session);
            setSession(session);
            if (session === null) {
                navigate(routes.login.href);
            }
        });

        // условный setState на изменения состояния аутентификации
        supabase.auth.onAuthStateChange((_event, session) => {
            // console.log('AuthStateSessionChange: ', session);
            setSession(session);
        });
    }, [navigate]);

    // Выход пользователя
    const signOut = async () => {
        console.log('signOut');
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
        navigate(routes.login.href);
    };

    // Загрузка аватара в storage
    const UploadAvatar = async (avatar: File, user_id: string, cv_id: string) => {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(`${user_id}/${cv_id}`, avatar);

        if (uploadError) throw new Error(uploadError.message);

        // Получение публичного URL аватара
        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);

        return urlData.publicUrl;
    };

    //Добавление нового CV с привязкой к id пользователя
    const insertCVbyID = async (user_id: string, formData: FormData) => {
        try {
            const { data, error } = await supabase
                .from('cv')
                .insert([
                    {
                        cv_name: formData.name,
                        name: formData.name,
                        last_name: formData.lastName,
                        email: formData.email,
                        telephone: formData.telephone,
                        about_me: formData.aboutMe,
                        avatar_url: '',
                        technical_skills: formData.technicalSkills,
                        user_id: user_id,
                    },
                ])
                .select();
            if (error) {
                console.error('InsertError:', error.message);
            }
            console.log('insert cv: ', data, error);
            if (data && data.length > 0) {
                const avatar_url =
                    formData.avatar && formData.avatar instanceof File
                        ? await UploadAvatar(formData.avatar, user_id, data[0]?.id)
                        : '';
                console.log(avatar_url);
                if (avatar_url) {
                    const { data: data_avatar, error: error_avatar } = await supabase
                        .from('cv')
                        .update({ avatar_url: avatar_url })
                        .eq('id', data[0]?.id)
                        .select();
                    if (error_avatar) {
                        console.error('InsertError:', error_avatar.message);
                    }
                    console.log('insert avatar: ', data_avatar, error_avatar);
                }

                if (formData.socialLabels) {
                    formData.socialLabels.map(async (socialLabel, index) => {
                        const { data: subdata, error: suberror } = await supabase
                            .from('socials')
                            .insert([
                                {
                                    name: socialLabel.name,
                                    url: socialLabel.url,
                                    cv_id: data[0]?.id,
                                },
                            ])
                            .select();
                        console.log(`insert SocialLabel №${index}: `, subdata, suberror);
                    });
                }
                if (formData.languageLabels) {
                    formData.languageLabels.map(async (languageLabel, index) => {
                        const { data: subdata, error: suberror } = await supabase
                            .from('languages')
                            .insert([
                                {
                                    name: languageLabel.name,
                                    degree: languageLabel.degree,
                                    cv_id: data[0]?.id,
                                },
                            ])
                            .select();
                        console.log(`insert languageLabel №${index}: `, subdata, suberror);
                    });
                }
                if (formData.educationLabels) {
                    formData.educationLabels.map(async (educationLabel, index) => {
                        const { data: subdata, error: suberror } = await supabase
                            .from('educations')
                            .insert([
                                {
                                    name: educationLabel.name,
                                    faculty: educationLabel.faculty,
                                    specialization: educationLabel.specialization,
                                    degree: educationLabel.degree,
                                    date_start: educationLabel.dataStart,
                                    date_end: educationLabel.dataEnd,
                                    cv_id: data[0]?.id,
                                },
                            ])
                            .select();
                        console.log(`insert educationLabel №${index}: `, subdata, suberror);
                    });
                }
                if (formData.courseLabels) {
                    formData.courseLabels.map(async (courseLabel, index) => {
                        const { data: subdata, error: suberror } = await supabase
                            .from('courses')
                            .insert([
                                {
                                    name: courseLabel.name,
                                    date_start: courseLabel.dataStart,
                                    date_end: courseLabel.dataEnd,
                                    cv_id: data[0]?.id,
                                },
                            ])
                            .select();
                        console.log(`insert coursesLabel №${index}: `, subdata, suberror);
                    });
                }
                if (formData.positionLabels) {
                    formData.positionLabels.map(async (positionLabel, index) => {
                        const { data: subdata, error: suberror } = await supabase
                            .from('positions')
                            .insert([
                                {
                                    name: positionLabel.name,
                                    description: positionLabel.description,
                                    tasks: positionLabel.tasks,
                                    stack: positionLabel.stack,
                                    date_start: positionLabel.dataStart,
                                    date_end: positionLabel.dataEnd,
                                    cv_id: data[0]?.id,
                                },
                            ])
                            .select();
                        console.log(`insert PositionLabel №${index}: `, subdata, suberror);
                    });
                }
            }
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during insert:', error);
            return { success: false, error };
        }
    };

    // Выбор всех СV пользователя по id пользователя (так как отключен RLS, access_token пока не используется)
    const selectCVbyUserID = async (user_id: string) => {
        try {
            const { data, error } = await supabase.from('cv').select('*').eq('user_id', user_id);
            if (error) {
                console.error('SelectError:', error.message);
            }
            console.log('Select:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during select:', error);
            return { success: false, error };
        }
    };
    // Выбор СV по его id (так как отключен RLS, access_token пока не используется)
    const selectCVbyID = async (cv_id: string) => {
        try {
            const { data: cvData, error: cvError } = await supabase.from('cv').select('*').eq('id', cv_id).single();
            if (cvError || !cvData) {
                console.error('SelectError:', cvError?.message);
                return { success: false, error: cvError };
            }
            const [
                { data: socialData },
                { data: languageData },
                { data: educationData },
                { data: courseData },
                { data: positionData },
            ] = await Promise.all([
                supabase.from('socials').select('*').eq('cv_id', cv_id),
                supabase.from('languages').select('*').eq('cv_id', cv_id),
                supabase.from('educations').select('*').eq('cv_id', cv_id),
                supabase.from('courses').select('*').eq('cv_id', cv_id),
                supabase.from('positions').select('*').eq('cv_id', cv_id),
            ]);

            // const { data: socialSubdata, error: socialSuberror } = await supabase
            //     .from('socials').select('*').eq('cv_id', cv_id);
            // console.log(`select SocialLabel `, socialSubdata, socialSuberror);

            // const { data: languageSubdata, error: languageSuberror } = await supabase
            //     .from('languages').select('*').eq('cv_id', cv_id)
            // console.log(`select languageLabel `, languageSubdata, languageSuberror);

            // const { data: educationSubdata, error: educationSuberror } = await supabase
            //     .from('educations').select('*').eq('cv_id', cv_id);
            // console.log(`select educationLabel `, educationSubdata, educationSuberror);

            // const { data: courseSubdata, error: courseSuberror } = await supabase
            //     .from('courses').select('*').eq('cv_id', cv_id);
            // console.log(`select coursesLabel `, courseSubdata, courseSuberror);

            // const { data: positionSubdata, error: positionSuberror } = await supabase
            //     .from('positions').select('*').eq('cv_id', cv_id);
            // console.log(`select PositionLabel `, positionSubdata, positionSuberror);

            // Формирование объекта FormData
            const formData: FormData = {
                name: cvData.name,
                lastName: cvData.last_name,
                email: cvData.email,
                telephone: cvData.telephone,
                aboutMe: cvData.about_me,
                avatar: cvData.avatar_url, // Предполагается, что avatar хранится как File
                technicalSkills: cvData.technical_skills || [],
                socialLabels:
                    socialData?.map((s) => ({
                        name: s.name,
                        url: s.url,
                    })) || [],
                languageLabels:
                    languageData?.map((l) => ({
                        name: l.name,
                        degree: l.degree,
                    })) || [],
                educationLabels:
                    educationData?.map((e) => ({
                        name: e.name,
                        faculty: e.faculty,
                        specialization: e.specialization,
                        degree: e.degree,
                        dataStart: e.data_start,
                        dataEnd: e.data_end,
                    })) || [],
                courseLabels:
                    courseData?.map((c) => ({
                        name: c.name,
                        dataStart: c.data_start,
                        dataEnd: c.data_end,
                    })) || [],
                positionLabels:
                    positionData?.map((p) => ({
                        name: p.name,
                        description: p.description,
                        tasks: p.tasks,
                        stack: p.stack,
                        dataStart: p.data_start,
                        dataEnd: p.data_end,
                    })) || [],
            };
            await setFormData(formData);
            // console.log("globalformData",globalformdata);
            console.log('Select:', formData);
            return { success: true, data: formData };
        } catch (error) {
            console.error('Unexpected error during select:', error);
            return { success: false, error };
        }
    };
    return (
        <AuthContext.Provider
            value={{
                signUpNewUser,
                signInUser,
                session,
                signOut,
                insertCVbyID,
                selectCVbyUserID,
                selectCVbyID,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
