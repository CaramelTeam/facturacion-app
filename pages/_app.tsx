import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { darkTheme } from '../themes/darkTheme';

import { ThemeProvider, CssBaseline } from '@mui/material'
import { Provider } from '@/redux/provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ThemeProvider theme={darkTheme} >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
