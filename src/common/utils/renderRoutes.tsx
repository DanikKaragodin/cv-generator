import { Route } from 'react-router';
import { IRoute } from '@common/types/Route';
import { ReactElement } from 'react';

export const renderRoutes = (routes: IRoute[]): ReactElement[] => {
    return routes.map((route) => (
        <Route
            key={route.page}
            path={route.href}
            element={route.component}
            {...(route.props || {})} // Передаём дополнительные пропсы, если они есть
        />
    ));
};
