import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { routes, TEST_IDS } from '@common/constants.tsx';

describe('App', () => {
    test('App is rendered and root components exists at dome', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );
        expect(screen.getByTestId(TEST_IDS.root)).toBeInTheDocument();
    });

    test('React application routes rendered correct component by its url', () => {
        render(
            <MemoryRouter initialEntries={[routes.userSetting.href]}>
                <App />
            </MemoryRouter>,
        );
        expect(screen.getByTestId(TEST_IDS.settings)).toHaveTextContent('Settings');
    });
});
