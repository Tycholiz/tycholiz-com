const baseTheme = {
  breakpoint: {
    mobileSmall: '400px',
    mobileMedium: '541px',
    mobileLarge: '650px',
  },
  breakpointInteger: {
    mobileSmall: 400,
    mobileMedium: 541,
    mobileLarge: 650,
  },
  color: {
    primary: ['#60c17d', '#5e8d6c'],
  },
  font: {
    heading: '"Lato", "Helvetica Neue", Helvetica, sans-serif',
    paragraph: '"Work Sans", sans-serif',
  },
}
export const lightTheme = {
  ...baseTheme,
  color: {
    ...baseTheme.color,
    background: '#FFFFFF',
    grayscale: [
      '#212121',
      '#414141',
      '#616161',
      '#9e9e9e',
      '#bdbdbd',
      '#e0e0e0',
      '#eeeeee',
      '#ffffff',
    ],
  },
}

export const darkTheme = {
  ...baseTheme,
  color: {
    ...baseTheme.color,
    background: '#061725',
    grayscale: [
      '#ffffff',
      '#eeeeee',
      '#e0e0e0',
      '#bdbdbd',
      '#9e9e9e',
      '#616161',
      '#414141',
      '#212121',
    ],
  },
}

export type Theme = typeof darkTheme
