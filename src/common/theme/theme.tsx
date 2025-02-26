import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 8px rgba(103, 58, 183, 0.3)',
                },
            },
        },
    },
    // shadows: [
    //   // ... другие тени
    //   "0px 2px 8px rgba(103, 58, 183, 0.3)", // elevation 4 (индекс 3)
    // ]
});
