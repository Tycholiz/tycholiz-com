import styled from 'styled-components'
import { Theme } from '../../styles/theme'

type Props = {
  theme: Theme
  bold?: boolean
}

export const Text = styled.span<Props>`
  color: ${({ theme }) => theme.color.grayscale[3]};
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
  font-size: 0.8rem;
  letter-spacing: 0.3px;
`
