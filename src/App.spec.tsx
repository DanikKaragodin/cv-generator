import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { routes, TEST_IDS } from '@common/constants.tsx';

describe('App', () => {
    test('App render and exist root component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );

        expect(screen.getByTestId(TEST_IDS.root)).toBeInTheDocument();
    });

    test('renders routes correct component', () => {
        render(
            <MemoryRouter initialEntries={[routes.userSettings.href]}>
                <App />
            </MemoryRouter>,
        );

        expect(screen.getByTestId(TEST_IDS.settings)).toHaveTextContent('Settings');
    });
});
