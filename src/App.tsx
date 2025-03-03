import { Route, Routes } from 'react-router';
import Navigation from '@common/components/Navigation/Navigation.tsx';
import { routes, TEST_IDS } from '@common/constants.tsx';
import { renderRoutes } from '@common/utils/renderRoutes';
import PDFview from '@pages/Generator/PDFview';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormDataProvider } from '@common/contexts/FormDataContext';
import 'dayjs/locale/ru.js';
import './App.css';
import { AuthContextProvider } from '@common/contexts/AuthContext';
function App() {
    return (
        <div className="app-root" data-testid={TEST_IDS.root}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <AuthContextProvider>
                    <Navigation />
                    <FormDataProvider>
                        <Routes>
                            {renderRoutes(Object.values(routes))}
                            <Route key={'Просмотр PDF'} path={'/create-cv/pdf-view'} element={<PDFview />} />
                        </Routes>
                    </FormDataProvider>
                </AuthContextProvider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
