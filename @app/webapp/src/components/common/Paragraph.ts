import styled from 'styled-components'

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.color.grayscale[1]};
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.3px;
  margin: 1rem 0 0;
`