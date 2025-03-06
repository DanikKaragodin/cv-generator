import { ReactElement } from 'react';

export interface IRoute {
    page: string;
    href: string;
    isSettings: boolean;
    isVisible: boolean;
    component?: ReactElement;
    props?: object;
}
