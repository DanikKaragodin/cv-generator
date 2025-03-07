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
    updateCVbyID: (
        user_id: string,
        cv_id: string,
        formData: FormData,
    ) => Promise<{
        success: boolean;
        error?: string | unknown;
    }>;
    selectCVbyUserID: (user_id: string) => Promise<{
        success: boolean;
        data?: { id: string; cv_name: string }[] | null;
        error?: string | unknown;
    }>;
    selectCVbyID: (cv_id: string) => Promise<{
        success: boolean;
        data?: FormData;
        error?: string | unknown;
    }>;
    deleteCVbyID: (cv_id: string) => Promise<{
        success: boolean;
        error?: string | unknown;
    }>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    signUpNewUser: async () => ({ success: false }),
    signInUser: async () => ({ success: false }),
    signOut: async () => {},
    insertCVbyID: async () => ({ success: false }),
    updateCVbyID: async () => ({ success: false }),
    selectCVbyUserID: async () => ({ success: false }),
    selectCVbyID: async () => ({ success: false }),
    deleteCVbyID: async () => ({ success: false }),
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const { formData: globalFormData, setFormData } = useFormData();
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
    // Выбор всех СV пользователя по id пользователя (так как отключен RLS, access_token пока не используется)
    const selectCVbyUserID = async (user_id: string) => {
        try {
            const { data, error } = await supabase.from('cv').select('id,cv_name').eq('user_id', user_id);
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

            const formData: FormData = {
                name: cvData.name,
                lastName: cvData.last_name,
                email: cvData.email,
                telephone: cvData.telephone,
                aboutMe: cvData.about_me,
                avatar: cvData.avatar_url,
                technicalSkills: cvData.technical_skills || [],
                socialLabels: cvData.socials || [],
                languageLabels: cvData.languages || [],
                educationLabels: cvData.educations || [],
                courseLabels: cvData.courses || [],
                positionLabels: cvData.positions || [],
            };
            setFormData(formData);
            console.log('globalformData', globalFormData);
            console.log('Select:', formData);
            return { success: true, data: formData };
        } catch (error) {
            console.error('Unexpected error during select:', error);
            return { success: false, error };
        }
    };
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
            .upload(`${user_id}/${cv_id}`, avatar, {
                upsert: true,
            });

        if (uploadError) throw new Error(uploadError.message);

        // Получение публичного URL аватара
        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);

        return urlData.publicUrl;
    };
    // Обновление CV по его ID
    const updateCVbyID = async (user_id: string, cv_id: string, formData: FormData) => {
        try {
            const { data, error } = await supabase
                .from('cv')
                .update([
                    {
                        cv_name: formData.name,
                        name: formData.name,
                        last_name: formData.lastName,
                        email: formData.email,
                        telephone: formData.telephone,
                        about_me: formData.aboutMe,
                        avatar_url:
                            formData.avatar && formData.avatar instanceof File
                                ? await UploadAvatar(formData.avatar, user_id, cv_id)
                                : formData.avatar,
                        technical_skills: formData.technicalSkills,
                        socials: formData.socialLabels || null,
                        languages: formData.languageLabels || null,
                        educations: formData.educationLabels || null,
                        courses: formData.courseLabels || null,
                        positions: formData.positionLabels || null,
                    },
                ])
                .eq('id', cv_id)
                .select()
                .single();
            if (error) {
                console.error('UpdateError:', error.message);
            }
            console.log('update cv: ', data, error);
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during update:', error);
            return { success: false, error };
        }
    };
    // Удаление CV по его ID
    const deleteCVbyID = async (cv_id: string) => {
        try {
            const { error } = await supabase.from('cv').delete().eq('id', cv_id);
            if (error) {
                console.error('Delete Error:', error.message);
            }
            return { success: true };
        } catch (error) {
            console.error('Unexpected error during Delete:', error);
            return { success: false, error };
        }
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
                        socials: formData.socialLabels || null,
                        languages: formData.languageLabels || null,
                        educations: formData.educationLabels || null,
                        courses: formData.courseLabels || null,
                        positions: formData.positionLabels || null,
                        user_id: user_id,
                    },
                ])
                .select()
                .single();
            if (error) {
                console.error('InsertError:', error.message);
            }
            console.log('insert cv: ', data, error);
            if (data && formData.avatar && formData.avatar instanceof File) {
                const avatar_url = await UploadAvatar(formData.avatar, user_id, data?.id);
                if (avatar_url) {
                    const { data: data_avatar, error: error_avatar } = await supabase
                        .from('cv')
                        .update({ avatar_url: avatar_url })
                        .eq('id', data?.id)
                        .select();
                    if (error_avatar) {
                        console.error('InsertError:', error_avatar.message);
                    }
                    console.log('insert avatar: ', data_avatar, error_avatar);
                }
            }
            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error during insert:', error);
            return { success: false, error };
        }
    };
    useEffect(() => {
        // используется для получения текущей сессии пользователя из БД
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session === null) {
                navigate(routes.login.href);
            }
        });

        // условный setState на изменения состояния аутентификации
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signUpNewUser,
                signInUser,
                session,
                signOut,
                selectCVbyUserID,
                selectCVbyID,
                insertCVbyID,
                updateCVbyID,
                deleteCVbyID,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
