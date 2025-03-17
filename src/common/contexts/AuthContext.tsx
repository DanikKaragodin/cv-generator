import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import supabase from '@common/utils/supabaseClient';
import { Session, User, WeakPassword } from '@supabase/supabase-js';
import { useNavigate } from 'react-router';
import { routes } from '@common/constants';

type AuthResponse = {
    user: User | null;
    session: Session | null;
    weakPassword?: WeakPassword;
};

type AuthContextType = {
    // session: Session | null | undefined;
    isAuthorized: boolean;
    userID: string;
    email: string;
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
};

const AuthContext = createContext<AuthContextType>({
    // session: null,
    isAuthorized: false,
    userID: '',
    email: '',
    signUpNewUser: async () => ({ success: false }),
    signInUser: async () => ({ success: false }),
    signOut: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null | undefined>(null);
    //const [isAuthorized, setIsAuth] = useState<boolean>(!!session);
    const isAuthorized = useMemo(() => {
        return !!session;
    }, [session]);
    //const [userID, setUserID] = useState<string>('');
    const userID = useMemo(() => {
        return session?.user?.id ? session.user.id : '';
    }, [session]);
    //const [email, setEmail] = useState<string>('');
    const email = useMemo(() => {
        return session?.user?.email ? session.user.email : '';
    }, [session]);

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

    // Выход пользователя
    const signOut = async () => {
        console.log('signOut');
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
        navigate(routes.login.href);
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
                //session,
                isAuthorized,
                userID,
                email,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
