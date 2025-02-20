import { Routes } from 'react-router';
import Navigation from '@common/components/Navigation/Navigation.tsx';
import { routes, TEST_IDS } from '@common/constants.tsx';
import { renderRoutes } from '@common/utils/renderRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru.js';
function App() {
    return (
        <div data-testid={TEST_IDS.root}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <Navigation></Navigation>
                <Routes>{renderRoutes(Object.values(routes))}</Routes>
            </LocalizationProvider>
        </div>
    );
}

export default App;
