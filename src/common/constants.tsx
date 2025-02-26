import Dashboard from '@pages/Dashboard/Dashboard.tsx';
import Generator from '@pages/Generator/Generator.tsx';
import Settings from '@pages/Settings/Settings.tsx';
import Login from '@pages/Login/Login.tsx';
import { IRoute } from '@common/types/Route.tsx';

export const routes: Record<string, IRoute> = {
    dashboard: { page: 'Главная', href: '/', isSettings: false, component: <Dashboard /> },
    createCV: {
        page: 'Создать резюме',
        href: '/create-cv',
        isSettings: false,
        component: <Generator />,
    },
    userSettings: {
        page: 'Настройки',
        href: '/user-settings',
        isSettings: true,
        component: <Settings />,
    },
    login: { page: 'Выйти', href: '/login', isSettings: true, component: <Login /> },
};

export enum languageDegrees {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}
export const emptyLabels = {
    linkLabel: {
        name: '',
        url: '',
    },
    educationLabel: {
        name: '',
        faculty: '',
        specialization: '',
        degree: '',
        dataStart: '',
        dataEnd: '',
    },
    courseLabel: { name: '', dataStart: '', dataEnd: '' },
    positionLabel: {
        name: '',
        description: '',
        tasks: [],
        stack: [],
        dataStart: '',
        dataEnd: '',
    },
    languageLabel: { name: '', degree: '' },
};
export enum TEST_IDS {
    settings = 'settings',
    root = 'root',
}
