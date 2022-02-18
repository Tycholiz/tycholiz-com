import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@styles/theme'
import { GlobalStyles } from '@styles/global'
import type { AppProps } from 'next/app'

/* 
  This is the entry point into Next.js. The `Component` prop here corresponds to
  the active page. Therefore, any props you send to Component will be received
  by the page.
*/
function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const localStorageDarkMode = localStorage.getItem('darkMode')
    if (localStorageDarkMode) {
      setDarkMode(localStorageDarkMode === 'true')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    isDarkMode === false ? setDarkMode(true) : setDarkMode(false)
    localStorage.setItem('darkMode', String(!isDarkMode))
  }
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </ThemeProvider>
  )
}
export default MyApp
