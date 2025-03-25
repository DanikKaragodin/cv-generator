import Dashboard from '@pages/Dashboard/Dashboard.tsx';
import Generator from '@pages/Generator/Generator.tsx';
import Settings from '@pages/Settings/Settings.tsx';
import Login from '@pages/Login/Login.tsx';
import { IRoute } from '@common/types/Route.tsx';
import PDF from '@pages/PDFview/PDF';
import { FormData } from './types/Labels';
export const routes: Record<string, IRoute> = {
    dashboard: {
        page: 'Главная',
        href: '/',
        isSettings: false,
        isVisible: true,
        component: <Dashboard />,
    },
    createCV: {
        page: 'Создать резюме',
        href: '/create-cv',
        isSettings: false,
        isVisible: true,
        component: <Generator />,
    },
    editCV: {
        page: 'Изменить резюме',
        href: '/edit-cv/:id',
        isSettings: false,
        isVisible: false,
        component: <Generator />,
    },
    userSettings: {
        page: 'Настройки',
        href: '/user-settings',
        isSettings: true,
        isVisible: true,
        component: <Settings />,
    },
    login: {
        page: 'Выйти',
        href: '/login',
        isSettings: true,
        isVisible: true,
        component: <Login />,
    },
    createdPDF: {
        page: 'Просмотр созданного PDF',
        href: '/pdf-view',
        isSettings: true,
        isVisible: false,
        component: <PDF />,
    },
    finishedPDF: {
        page: 'Просмотр готового PDF',
        href: '/pdf-view/:id',
        isSettings: true,
        isVisible: false,
        component: <PDF />,
    },
};

export enum languageDegrees {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}
export const defaultState: FormData = {
    id: '',
    CVname: '',
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    aboutMe: '',
    avatar: '',
    technicalSkills: [],
    socialLabels: [],
    languageLabels: [],
    educationLabels: [],
    courseLabels: [],
    positionLabels: [],
};
export const emptyLabels = {
    login: { email: '', password: '' },
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
