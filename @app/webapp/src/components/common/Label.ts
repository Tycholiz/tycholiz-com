import styled from 'styled-components'

export const Label = styled.label`
  font-family: ${({ theme }) => theme.font.paragraph};
  color: ${({ theme }) => theme.color.grayscale[1]};
  font-size: 0.8rem;
  line-height: 2em;
`