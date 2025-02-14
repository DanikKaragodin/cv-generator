import { render, screen } from '@testing-library/react';
import { IRoute } from '@common/types/Route.tsx';
import { MemoryRouter, Routes } from 'react-router';
import { renderRoutes } from '@common/utils/renderRoutes.tsx';

const TEST_TEXT_PROP = 'test_text';
const TEST_ID = 'test_id';

const TestComp = ({ testProp }: { testProp: string }) => {
    return <div data-testid={TEST_ID}>{testProp}</div>;
};

const ROUTES_MOCK: Record<string, IRoute> = {
    test: {
        href: '/test',
        isSettings: false,
        page: 'test',
        component: <TestComp testProp={TEST_TEXT_PROP} />,
    },
};
describe('renderRoutes util function tests', () => {
    beforeAll(() => {
        render(
            <MemoryRouter initialEntries={[ROUTES_MOCK.test.href]}>
                <Routes>{renderRoutes(Object.values(ROUTES_MOCK))}</Routes>
            </MemoryRouter>,
        );
    });
    test('renders required component correctly and opens it by its url', () => {
        expect(screen.getByTestId(TEST_ID)).toHaveTextContent(TEST_TEXT_PROP);
    });
});
