import { Routes } from 'react-router';
import Navigation from '@common/components/Navigation/Navigation.tsx';
import { routes, TEST_IDS } from '@common/constants.tsx';
import { renderRoutes } from '@common/utils/renderRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormDataProvider } from '@common/contexts/FormDataContext';
import 'dayjs/locale/ru.js';
import './App.css';
import { AuthContextProvider } from '@common/contexts/AuthContext';
import { SupabaseContextProvider } from '@common/contexts/SupabaseContext';
function App() {
    return (
        <div className="app-root" data-testid={TEST_IDS.root}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <FormDataProvider>
                    <AuthContextProvider>
                        <SupabaseContextProvider>
                            <Navigation />
                            <Routes>{renderRoutes(Object.values(routes))}</Routes>
                        </SupabaseContextProvider>
                    </AuthContextProvider>
                </FormDataProvider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
