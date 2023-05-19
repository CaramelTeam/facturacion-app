import { createTheme, ThemeOptions } from '@mui/material';

export const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#ffd54f',
            main: '#ffc107',
            dark: '#ffb300'
        },
        background: {
            paper: ' #161B22',
            default: ' #0D1117',
        }
    }
})