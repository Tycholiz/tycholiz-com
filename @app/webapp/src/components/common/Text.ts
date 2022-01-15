import styled from 'styled-components'

export const Text = styled.span`
  color: ${({ theme }) => theme.color.grayscale[3]};
  font-weight: ${({ bold }: any) => bold ? 'bold' : 'normal'};
  font-size: 0.8rem;
  letter-spacing: 0.3px;
`
