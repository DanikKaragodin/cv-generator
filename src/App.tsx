import { Routes } from 'react-router';
import Navigation from '@common/components/Navigation/Navigation.tsx';
import { routes, TEST_IDS } from '@common/constants.tsx';
import { renderRoutes } from '@common/utils/renderRoutes';

function App() {
    return (
        <div data-testid={TEST_IDS.root}>
            <Navigation></Navigation>
            <Routes>{renderRoutes(Object.values(routes))}</Routes>
        </div>
    );
}

export default App;
