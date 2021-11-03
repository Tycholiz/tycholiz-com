
const baseTheme = {
  breakpoint: {
    mobileSmall: '400px',
    mobileMedium: '541px',
    mobileLarge: '950px',
  },
  color: {
    primary: [
      '#1976d2', 
      '#2196f3', 
      '#71bcf7', 
      '#c2e2fb',
    ],
  },
  font: {
    heading: 'Arial',
    paragraph: 'Arial',
  }
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
    background: '#000000',
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