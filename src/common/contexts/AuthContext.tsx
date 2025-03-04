import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@common/utils/supabaseClient';
import { AuthResponse, Session } from '@supabase/supabase-js';
import { FormData } from '@common/types/Labels';
import { useNavigate } from 'react-router';

type AuthContextType = {
    session: Session | null;
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
        user_id: string | undefined,
        formData: FormData,
    ) => Promise<{
        success: boolean;
        data?: Response;
        error?: string;
    }>;
    selectCVbyID: (user_id: string | undefined) => Promise<{
        success: boolean;
        data?: Response;
        error?: string;
    }>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    signUpNewUser: async () => ({ success: false }),
    signInUser: async () => ({ success: false }),
    signOut: async () => {},
    insertCVbyID: async () => ({ success: false }),
    selectCVbyID: async () => ({ success: false }),
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>();
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
            console.log('initSession: ', session);
            setSession(session);
            if (session === null) {
                navigate('/login');
            }
        });

        // условный setState на изменения состояния аутентификации
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('AuthStateSessionChange: ', session);
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
        navigate('/login');
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
                const avatar_url = formData.avatar ? await UploadAvatar(formData.avatar, user_id, data[0]?.id) : '';
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

    // Выбор всех СV пользователя по его id (так как отключен RLS, access_token пока не используется)
    const selectCVbyID = async (user_id: string) => {
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

    return (
        <AuthContext.Provider
            value={{
                signUpNewUser,
                signInUser,
                session,
                signOut,
                insertCVbyID,
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
