import React, { Fragment } from 'react'
import { NextPage } from 'next'
import styled, { ThemeProps, ThemeProvider } from 'styled-components'
import { FaMoon, FaRegMoon } from 'react-icons/fa'
import { useDarkMode } from '../hooks'
import { lightTheme, darkTheme } from '../components'

interface IThemeProps
  extends ThemeProps<{
    bg: {
      primary: string
    }
    text: {
      primary: string
    }
  }> { }

export const GlobalStyles = styled.div`
  background: ${({ theme }: IThemeProps) => theme.bg};
  color: ${({ theme }: IThemeProps) => theme.text};
  transition: all 0.50s linear;`

const Layout: NextPage<{}> = ({ children }) => {
  const [theme, themeToggler, mounted] = useDarkMode()

  // prevents ssr flash for mismatched dark mode
  if (!mounted) return <div style={{ visibility: 'hidden' }} />

  console.log(theme)

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles className="h-screen">
        <div className="absolute right-0 m-2 rounded-full inline-flex items-center">
          <button
            aria-label="Dark mode"
            className="focus:outline-none active:outline-none"
            onClick={themeToggler}
          >
            {theme === 'light' ? <FaMoon /> : <FaRegMoon />}
          </button>
        </div>
        <main className="py-8 flex flex-col justify-center items-center">
          <Fragment>
            {children}
          </Fragment>
        </main>
        <footer className="absolute bottom-0 w-full h-30 mb-2 flex flex-row justify-center items-center">
          <a
            href={"https://github.com/rjoydip"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center"
          >
            {"Powered by rjoydip"}
          </a>
        </footer>
      </GlobalStyles>
    </ThemeProvider>
  )
}
export { Layout }
