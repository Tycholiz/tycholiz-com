import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/global'
import type { AppProps } from 'next/app'

/* 
  This is the entry point into Next.js. The `Component` prop here corresponds to
  the active page. Therefore, any props you send to Component will be received
  by the page.
*/
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
