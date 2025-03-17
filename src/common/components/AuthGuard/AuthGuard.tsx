import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UserAuth } from '@common/contexts/AuthContext';
import { routes } from '@common/constants';

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthorized } = UserAuth();

    useEffect(() => {
        console.log(location.pathname);
        if (!isAuthorized) {
            navigate(routes.login.href);
        }
    }, [location.pathname]);

    return children;
};

export default AuthGuard;
