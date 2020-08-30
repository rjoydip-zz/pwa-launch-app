import * as colors from './colors'

const light = {
  bg: colors.white,
  text: colors.black,
  link: colors.teal[700],
  bgName: "white",
  textName: "black"
}

const dark = {
  bg: colors.black,
  text: colors.white,
  link: colors.orange[700],
  bgName: "black",
  textName: "white"
}

const defaultTheme = {}
export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }
