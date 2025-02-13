import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { routes } from '@common/constants.tsx';

describe('App', () => {
    test('renders check', () => {
        const renderApp = () => {
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>,
            );
        };
        expect(renderApp).not.toThrow();
    });

    test('renders routes', () => {
        render(
            <MemoryRouter initialEntries={routes.map((route) => route.href)}>
                <App />
            </MemoryRouter>,
        );
        routes.forEach((route) => {
            const elements = screen.getAllByText(route.page);
            expect(elements.length).toBeGreaterThan(0);
        });
    });
});
