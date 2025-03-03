import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@common/utils/supabaseClient';
import { AuthResponse, Session } from '@supabase/supabase-js';
import { routes } from '@common/constants';
// import { FormData } from '@common/types/Labels';

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
    selectCVbyID: (
        access_token: string,
        user_id: string,
    ) => Promise<{
        success: boolean;
        data?: Response;
        error?: string;
    }>;
    isLogoutAction: boolean;
    setIsLogoutAction: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    signUpNewUser: async () => ({ success: false }),
    signInUser: async () => ({ success: false }),
    signOut: async () => {},
    selectCVbyID: async () => ({ success: false }),
    isLogoutAction: false,
    setIsLogoutAction: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>();
    const [isLogoutAction, setIsLogoutAction] = useState(false);
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
            if (session) routes.login.page = 'Выйти';
            setSession(session);
        });

        // условный setState на изменения состояния аутентификации
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('AuthStateSessionChange: ', session);
            setSession(session);
        });
    }, []);

    // Выход пользователя
    const signOut = async () => {
        console.log('signOut');
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
    };

    // Загрузка аватара в storage
    // const UploadAvatar = async (avatar: File, user_id: string) => {
    //     const { data: uploadData, error: uploadError } = await supabase.storage
    //         .from('avatars')
    //         .upload(`user_${user_id}/avatar.png`, avatar);

    //     if (uploadError) throw new Error(uploadError.message);

    //     // Получение публичного URL аватара
    //     const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);

    //     return urlData.publicUrl;
    // };

    // Добавление нового CV с привязкой к id пользователя
    // НЕДОДЕЛАНО
    // const insertCVbyID = async (access_token: string, user_id: string, formData: FormData) => {
    //     const avatar_url = formData.avatar ? UploadAvatar(formData.avatar, user_id) : '';
    //     const { data, error } = await supabase
    //         .from('cv')
    //         .insert([
    //             {
    //                 name: formData.name,
    //                 last_name: formData.lastName,
    //                 email: formData.email,
    //                 telephone: formData.telephone,
    //                 about_me: formData.aboutMe,
    //                 avatar_url: avatar_url,
    //             },
    //         ])
    //         .select();
    //     console.log(data, error);
    // };

    // Выбор всех СV пользователя по его id (так как отключен RLS, access_token пока не используется)
    const selectCVbyID = async (access_token: string, user_id: string) => {
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
            value={{ signUpNewUser, signInUser, session, signOut, selectCVbyID, isLogoutAction, setIsLogoutAction }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
