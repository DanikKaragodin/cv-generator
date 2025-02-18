import { ReactElement } from 'react';

export interface IRoute {
    page: string;
    href: string;
    isSettings: boolean;
    component?: ReactElement;
    props?: object;
}
