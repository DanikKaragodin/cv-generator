import Dashboard from '@pages/Dashboard/Dashboard.tsx';
import Generator from '@pages/Generator/Generator.tsx';
import Settings from '@pages/Settings/Settings.tsx';
import Login from '@pages/Login/Login.tsx';
import { IRoute } from '@common/types/Route.tsx';

export const routes: Record<string, IRoute> = {
    main: { page: 'Главная', href: '/', isSettings: false, component: <Dashboard /> },
    createCV: {
        page: 'Создать резюме',
        href: '/create-cv',
        isSettings: false,
        component: <Generator />,
    },
    userSetting: {
        page: 'Настройки',
        href: '/user-settings',
        isSettings: true,
        component: <Settings />,
    },
    login: { page: 'Выйти', href: '/login', isSettings: true, component: <Login /> },
};

export enum TEST_IDS {
    settings = 'settings',
    root = 'root',
}
