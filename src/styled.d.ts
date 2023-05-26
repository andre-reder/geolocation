import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string,
      darkerBackground: string,
      lighterBackground: string,
      defaultBorder: string,
      backgroundWithOpacity: string,

      secondary: {
        lighter: string,
        light: string,
        main: string,
        dark: string,
      },

      chart: {
        main: string,
      },

      primary: {
        lighter: string,
        light: string,
        main: string,
        dark: string,
      },

      blue: {
        50: string,
        100: string,
        200: string,
        900: string,
      },

      gray: {
        900: string,
        201: string,
        200: string,
        100: string,
        75: string,
        50: string,
      },

      green: {
        500: string,
        100: string,
      },

      orange: {
        500: string,
        100: string,
      },

      danger: {
        light: string,
        main: string,
        dark: string,
      },
    },

    filters: {
      primary: string,
    },
  }
}
