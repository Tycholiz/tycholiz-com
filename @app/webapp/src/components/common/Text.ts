import styled from 'styled-components'
import { Theme } from '@styles/theme'

type Props = {
  theme: Theme
  bold?: boolean
  small?: boolean
  colored?: boolean
}

export const Text = styled.span<Props>`
  color: ${({ theme, colored }) => (colored ? theme.color.primary[0] : theme.color.grayscale[3])};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: ${({ small }) => (small ? '0.6rem' : '0.8rem')};
  letter-spacing: 0.3px;
`
